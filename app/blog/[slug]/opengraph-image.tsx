import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pre-render one image per post; without this the route stays dynamic and every
// post would share a single generic card.
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  const date = post
    ? new Date(post.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#16181d",
          color: "#f2f3f5",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 2,
            color: "#1acfdf",
          }}
        >
          <span>WRITING</span>
          <span style={{ color: "#a0a3a9", letterSpacing: 0 }}>{date}</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: post && post.title.length > 48 ? 58 : 68,
            fontWeight: 600,
            letterSpacing: -2,
            lineHeight: 1.08,
          }}
        >
          {post?.title ?? "Writing"}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#a0a3a9",
            borderTop: "1px solid #33363d",
            paddingTop: 22,
          }}
        >
          <span>{site.shortName}</span>
          <span>gershon.one</span>
        </div>
      </div>
    ),
    size,
  );
}
