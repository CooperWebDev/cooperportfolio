Deploying this static site to Vercel

Option A — Deploy from Git (recommended):
1. Push this repository to GitHub/GitLab/Bitbucket.
2. Connect the repository in the Vercel Dashboard.
3. Vercel will detect a static project and use the configuration in `vercel.json`.

Option B — Deploy with the Vercel CLI:
1. Install the CLI: `npm i -g vercel`.
2. From the project root run: `vercel` and follow prompts.
3. To do a production deploy: `vercel --prod`.

Notes:
- The `vercel.json` file uses the `@vercel/static` builder and `cleanUrls`.
- Files are served from the repository root; no build step required.
- If you link a Git repo, Vercel will auto-deploy on pushes.
