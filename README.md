# Mark Kigen — Portfolio

A hand-built personal portfolio: no frameworks, no build step, no dependencies.
HTML, CSS and vanilla JavaScript, served straight from GitHub Pages.

**Live:** https://kigenmark53.github.io/MyPortfolio/

---

## What's inside

| File | Purpose |
| --- | --- |
| `index.html` | Page markup, metadata, Open Graph tags, structured data (`schema.org/Person`) |
| `style.css` | Design tokens, ambient gradient scene, glass surfaces, all responsive rules |
| `script.js` | Scroll reveals, sticky nav, active-section tracking, pointer spotlight, 3D tilt, counters, copy-to-clipboard |
| `404.html` | Custom not-found page (used automatically by GitHub Pages) |
| `favicon.svg` | Monogram favicon (also the Apple touch icon) |
| `og-card.jpg` | 1200×630 social sharing card |
| `robots.txt`, `sitemap.xml` | Crawler hints for search engines |
| `vercel.json` | Vercel config: no build step, security + cache headers, clean URLs |
| `.nojekyll` | Tells GitHub Pages to serve files as-is, no Jekyll processing |
| `Dot.py`, `notebook.ipynb` | Small Python coursework scripts (kept from the original repo) |

## Design notes

- **Animated aurora background** — three slowly drifting blurred gradients plus a static
  grid and film grain, all on a fixed layer behind the content. Nothing animates on the
  main thread; the only JS driven motion is the pointer spotlight, and it's throttled
  through `requestAnimationFrame`.
- **Glass surfaces** — translucent panels with `backdrop-filter: blur() saturate()`,
  1px hairline borders, and gradient-tinted "art" panels on each project card so every
  card reads as distinct without needing screenshots.
- **Typography** — Inter Tight for text, Instrument Serif italic for accent phrases,
  JetBrains Mono for labels and metadata. Loaded from Google Fonts with preconnect.
- **Performance** — one stylesheet, one script, both small. Fonts and images are the only
  external requests.

## Accessibility

- Semantic landmarks, a skip link, and a visible `:focus-visible` ring on every control.
- Mobile menu is a real button with `aria-expanded` / `aria-controls`, closes on `Escape`,
  on link click, and on outside interaction.
- Fully honours `prefers-reduced-motion`: all animation, drifting gradients, tilt, and
  scroll reveals are disabled and content renders immediately.
- Text meets contrast targets on the dark background; `@media print` gives a clean,
  ink-friendly version for PDF export.

## Running locally

```bash
# any static server works
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

The site is pure static files — no build command, no dependencies, no output directory
to populate. That means it deploys unchanged to Vercel, Netlify, or GitHub Pages.

- **Vercel** (recommended): import the repo, framework preset **Other**, leave build
  command empty, output directory `.`. `vercel.json` already handles the rest.
- **GitHub Pages**: `master` branch, `/ (root)` folder.

See **[DEPLOY.md](DEPLOY.md)** for both.

## Editing content

Everything is in `index.html`, grouped by section and commented:

- Hero copy → `<section class="hero">`
- Projects → `.work-grid` (duplicate a `<article class="card">` block)
- "Also in the lab" list → `.lab__list`
- About, stack, timeline → `#about`, `#stack`, `#path`
- Contact details → `#contact`

Colours live at the top of `style.css` under `:root` — change `--violet`, `--cyan`,
and `--rose` and the whole site's accent scheme follows.

---

© Mark Kigen · kigenmark53@gmail.com
