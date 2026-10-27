# LinkedIn ↔ blog

Two one-way links between LinkedIn and the blog in `content/blog/`.

| Direction | How | When |
| --- | --- | --- |
| Blog → LinkedIn | `.github/workflows/share-to-linkedin.yml` runs `scripts/share-to-linkedin.mjs` | Automatically, on every push to `main` that publishes a post |
| LinkedIn → blog | `scripts/import-linkedin.mjs` reads LinkedIn's data export | When you run it |

LinkedIn → blog cannot be automatic. LinkedIn's API only lets approved
partners read a member's posts (the `r_member_social` permission, closed to new
applicants), and scraping LinkedIn breaks its terms. The data export is the
sanctioned way to get your own posts out.

## Blog → LinkedIn

### What gets shared

A post is shared when a push to `main` **publishes** it: the file is new, or
`draft: true` became `draft: false`. It is never shared when:

- it came from LinkedIn (front matter has `linkedin:`), so nothing loops;
- it has `share: false` in its front matter;
- its `date` is before `SHARE_SINCE` in `scripts/share-to-linkedin.mjs`
  (2026-10-27), so older articles are not re-announced;
- it is a French translation in `content/blog/fr/`.

Editing an already-published post never re-shares it. The workflow waits
(up to 15 minutes) until the post's URL is live before sharing, so LinkedIn
never links to a page that is still deploying.

To share a specific post by hand (including one dated before the cutoff),
open **Actions → Share to LinkedIn → Run workflow** and enter its slug.

### One-time setup

1. Create an app at <https://www.linkedin.com/developers/apps>. LinkedIn asks
   for a LinkedIn Page to associate it with; any Page you admin works, and
   posts are still made as you, not as the Page.
2. On the app's **Products** tab, add **Share on LinkedIn** and
   **Sign In with LinkedIn using OpenID Connect**. Both are self-serve.
3. On the **Auth** tab, open **OAuth 2.0 tools → Create token**, tick
   `openid`, `profile` and `w_member_social`, and sign in. Copy the token.
4. In GitHub, go to the repository's **Settings → Secrets and variables →
   Actions** and add a secret named `LINKEDIN_ACCESS_TOKEN` with that token.
   Optionally add `LINKEDIN_PERSON_URN` (`urn:li:person:…`); without it the
   script looks it up from the token on each run.

Until the secret exists, the workflow runs and skips with a note instead of
failing.

### Renewing the token

LinkedIn access tokens expire after **60 days**. When one expires, the
workflow fails with a message saying so. Repeat step 3 and update the secret,
then re-run the failed workflow (or use **Run workflow** with the slug).

### Trying it safely

```bash
node scripts/share-to-linkedin.mjs --slug network-is-slow-not-the-fibre --dry-run
```

prints the exact payload without calling LinkedIn.

## LinkedIn → blog

1. On LinkedIn: **Settings → Data privacy → Get a copy of your data**, choose
   **Posts** (or the full archive) and request it. LinkedIn emails a link,
   usually within minutes for a partial export.
2. Unzip it, then preview what would be imported:

   ```bash
   node scripts/import-linkedin.mjs path/to/export-folder --dry-run
   ```

3. Run it for real (drop `--dry-run`). Each new post is written to
   `content/blog/<slug>.md` as a **draft**, tagged `LinkedIn`, with its
   hashtags as tags and a `linkedin:` link back to the original.
4. Review each draft: the title and summary are generated from the first
   lines of the post, and the importer flags posts that were
   connections-only on LinkedIn. When one is ready, set `draft: false`.

Re-running with a newer export only adds posts that are not already in the
blog. Reshares with no text of their own are skipped. Images attached on
LinkedIn are not copied, because the export links to LinkedIn's CDN, whose
URLs expire; add a `cover:` image by hand where one matters.

Imported posts show **Originally posted on LinkedIn** under the title and are
English-only; the French blog lists only posts that have a translation in
`content/blog/fr/`.
