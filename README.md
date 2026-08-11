# Tiferret n tludna n Linux

Aftul (cheat sheet) n tludna n Linux, s Teqbaylit. Static site, ready for GitHub Pages, no build step.

## Structure

```
index.html                 the page shell — structure only, no inline CSS/JS
assets/
  css/
    fonts.css               @font-face rules, self-hosted
    style.css               all layout/visual styles
  js/
    data.js                 ✏️ EDIT HERE — commands, sections, meta text
    app.js                  rendering + interaction logic (search, copy, print, reveal)
  fonts/
    space-grotesk-*.woff2   self-hosted, OFL-1.1
    ibm-plex-sans-*.woff2   self-hosted, OFL-1.1
    ibm-plex-mono-*.woff2   self-hosted, OFL-1.1
    LICENSE-*.txt           the OFL license text for each family
  img/                      (empty — see "Self-hosting the mascot image" below)
```

## Editing content

You almost never need to touch `app.js` or the CSS. To add a command, a section,
or change the header text, edit `assets/js/data.js` — it's plain data, commented
inline with the block types available (`cmd`, `io`, `note`, `p`, `lead`, `tip`, `term`).
Numbering, counters, and search all update automatically from that file.

## Fonts: fully self-hosted, zero CDN calls

The original page pulled Space Grotesk, IBM Plex Sans, and IBM Plex Mono from
`cdn.jsdelivr.net`. That's gone now — `assets/fonts/` ships the three weights
actually used (500/700 for Space Grotesk, 400/500/600 for the two Plex families)
as `.woff2`, pulled from the official `@fontsource` npm packages (Latin subset,
~156 KB total). `assets/css/fonts.css` declares them with `font-display: swap`.
License files are included next to the font files (OFL-1.1 — free to bundle
and redistribute, attribution kept in the license text).

One caveat: none of these three families ship a Tifinagh subset, so the ⵣ /
ⴰⴳⴷⴹⴽⵎⵏⵔⵜⵣⵖⵃ glyphs used decoratively in the title animation fall back to
whatever font on the visitor's system covers Tifinagh — this was already true
with the jsDelivr-hosted fonts, self-hosting doesn't change it.

If you want to regenerate or add weights yourself:
```bash
npm install @fontsource/space-grotesk @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono
# then copy the relevant *-latin-<weight>-normal.woff2 files from
# node_modules/@fontsource/<family>/files/ into assets/fonts/
```

## Self-hosting the mascot image

One external request remains: the penguin mascot in the masthead, currently
pointed at `image.qwenlm.ai`. This environment couldn't fetch that binary
directly to bundle it for you, so to finish the job:

1. Download the image:
   `https://image.qwenlm.ai/public_source/10a5a5cd-affd-4f03-9de8-81ee8de1a906/104b64425-8185-4565-9bcf-296b1433494c.png`
2. Save it as `assets/img/mascot.png` (re-encode to `.webp` if you want it smaller).
3. In `index.html`, change the `<img class="mascot" src="...">` line to
   `src="assets/img/mascot.png"`.

## Running locally

No build step — any static server works:
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to GitHub Pages

1. Push this folder to a repo (root, or a `docs/` folder — either works).
2. In the repo settings → Pages, set the source to that branch/folder.
3. Done — `index.html` is the entry point, everything else is relative paths.

No Jekyll processing is needed; nothing here uses `_` prefixed files or Liquid,
so Pages will serve it as-is.
