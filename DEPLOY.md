# Deploying this portfolio

The site is static — HTML, CSS, JS and images. No build step, no dependencies.
Pick either host; both are free.

- [Vercel](#vercel) — fastest, no repo-visibility requirement
- [GitHub Pages](#github-pages) — needs a public repo + a settings toggle

---

## Vercel

`vercel.json` is already committed, so there is nothing to configure by hand.

### Via the dashboard

1. Go to https://vercel.com/new
2. Under **Import Git Repository**, pick `Kigenmark53/MyPortfolio`
   (click **Adjust GitHub App Permissions** if it isn't listed)
3. Vercel will try to detect a framework — leave the preset as **Other**
4. **Build Command:** leave empty · **Output Directory:** `.` · **Install Command:** leave empty
5. Click **Deploy**

You get `https://my-portfolio-<hash>.vercel.app` in about 20 seconds, and every push
to `master` redeploys automatically.

### Via the CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### After the first deploy

- **Rename the domain:** Project → Settings → Domains, or project Settings → Project Name.
  Something like `mark-kigen.vercel.app` reads better than the generated hash.
- **Update the canonical URLs.** `index.html`, `sitemap.xml` and `robots.txt` currently
  point at the GitHub Pages address. Once you know your Vercel URL, ask me to swap them
  in one pass — leaving them stale means social previews and search engines reference
  the wrong host.

---

# GitHub Pages

One-time setup, about two minutes. After this, every push to `master` republishes the site
within ~30 seconds.

The repo is currently **private**. GitHub Pages on a free plan requires a public repo, so
step 1 is the only part you have to do in the browser — the token this session uses can
push code but isn't allowed to change repo settings.

---

## 1. Make the repository public

1. Open https://github.com/Kigenmark53/MyPortfolio/settings
2. Scroll to the very bottom: **Danger Zone → Change repository visibility → Change to public**
3. Type `Kigenmark53/MyPortfolio` to confirm.

> Check there's nothing in the repo you'd rather keep private first. Right now it's a
> portfolio plus two small Python coursework files (`Dot.py`, `notebook.ipynb`).

## 2. Turn on Pages

1. Go to https://github.com/Kigenmark53/MyPortfolio/settings/pages
2. **Build and deployment → Source:** `Deploy from a branch`
3. **Branch:** `master`, **Folder:** `/ (root)` → **Save**
4. Wait for the green check in the **Actions** tab (usually under a minute).

Your site will be live at:

```
https://kigenmark53.github.io/MyPortfolio/
```

`.nojekyll` is already committed, so Pages serves the files exactly as they are.

## 3. Finish the polish (optional but recommended)

- **Set the repo description + website.** On the repo's main page, click the gear next to
  *About*: description = `Personal portfolio — full-stack developer`, website =
  `https://kigenmark53.github.io/MyPortfolio/`.
- **Add it to your GitHub profile.** Create a repo named exactly `Kigenmark53` (same as
  your username) with a README, and link the portfolio at the top — it becomes
  your profile front page.
- **LinkedIn.** Add the live URL to the Website field of your profile.
- **Custom domain.** If you buy one later (e.g. `markkigen.dev`), add a `CNAME` file
  containing just the domain, then point an `A`/`CNAME` record at GitHub Pages.

## Updating the site

```bash
git add .
git commit -m "Update portfolio"
git push origin master
```

Pages rebuilds automatically. No build step, no dependencies to install.

## If Pages is blocked

Two alternatives that work with a private repo, both free tiers:

- **Netlify** — netlify.com → *Add new site* → *Import an existing project* → GitHub →
  pick this repo. Build command: leave empty. Publish directory: `.`
- **Vercel** — vercel.com → *Add New Project* → import this repo. Framework preset:
  **Other**. Build command: empty. Output directory: `.`

Both give you a `*.netlify.app` / `*.vercel.app` URL and auto-deploy on every push.
