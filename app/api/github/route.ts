import { NextResponse } from "next/server";

/**
 * Contribution counts and recent public activity.
 *
 * The contribution graph is only exposed through GitHub's GraphQL API, which
 * requires a token. Without one we fall back to the public events endpoint so
 * the component still renders something real rather than an error state.
 */

export const revalidate = 3600;

const FETCH_TIMEOUT_MS = 8000;

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }[];
          }[];
        };
      };
    };
  };
};

type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
};

const LEVELS: Record<string, Day["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

async function readJson<T>(response: Response): Promise<T | undefined> {
  const body = await response.text();
  if (!body.trim()) return undefined;
  try {
    return JSON.parse(body) as T;
  } catch {
    return undefined;
  }
}

/**
 * Deliberately takes no `request` argument.
 *
 * Reading headers (for per-IP rate limiting) opts the route into dynamic
 * rendering, which discards `revalidate` — so every request would reach
 * GitHub, which is exactly the abuse the rate limit was meant to prevent.
 * Route-level caching is the stronger control here: it bounds outbound calls
 * to one per hour regardless of how many requests arrive.
 */
export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  // Interpolated into a URL path. GitHub handles are alphanumeric with
  // hyphens; rejecting anything else prevents a misconfigured value from
  // altering the request path.
  if (username && !/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(username)) {
    console.error("[github] GITHUB_USERNAME is not a valid handle; ignoring.");
    return NextResponse.json(
      { configured: false, reason: "Invalid username configured." },
      { status: 200 },
    );
  }

  if (!username) {
    return NextResponse.json(
      { configured: false, reason: "GITHUB_USERNAME is not set." },
      { status: 200 },
    );
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "gershon.one",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  let days: Day[] = [];
  let total = 0;

  if (token) {
    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        body: JSON.stringify({
          query: `query($login:String!){
            user(login:$login){
              contributionsCollection{
                contributionCalendar{
                  totalContributions
                  weeks{ contributionDays{ date contributionCount contributionLevel } }
                }
              }
            }
          }`,
          variables: { login: username },
        }),
        next: { revalidate },
      });

      if (res.ok) {
        const json = await readJson<GraphQLResponse>(res);
        const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
        if (cal) {
          total = cal.totalContributions;
          days = cal.weeks.flatMap((w) =>
            w.contributionDays.map((d) => ({
              date: d.date,
              count: d.contributionCount,
              level: LEVELS[d.contributionLevel] ?? 0,
            })),
          );
        }
      }
    } catch (err) {
      console.error("[github] contribution graph failed:", err);
    }
  }

  let events: { id: string; type: string; repo: string; at: string }[] = [];
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=8`,
      { headers, next: { revalidate }, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) },
    );
    if (res.ok) {
      const json = await readJson<GitHubEvent[]>(res);
      if (Array.isArray(json)) {
        events = json.map((e) => ({
          id: e.id,
          type: e.type.replace(/Event$/, ""),
          repo: e.repo.name,
          at: e.created_at,
        }));
      }
    }
  } catch (err) {
    console.error("[github] events failed:", err);
  }

  return NextResponse.json({
    configured: true,
    username,
    total,
    days,
    events,
    hasGraph: days.length > 0,
  });
}
