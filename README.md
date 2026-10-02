# Digital Identity Card

A premium, fully-responsive digital identity card built with vanilla HTML, CSS, and JavaScript.

---

## Overview

An interactive digital ID card that mimics the look and feel of a real identity card. Flip it, drag it, scan it, click it — everything is designed to feel premium and physical.

Live demo: **[aydope.github.io/id](https://aydope.github.io/id/)**

---

## Features

- **3D Flip Animation** — Drag to rotate freely or click to flip between front and back
- **Realistic Card Design** — Holographic strip, EMV chip, MRZ strip, signature, and fingerprint
- **Full ID Details** — Name, date of birth, nationality, ID number, issue/expiry dates
- **Click-to-Copy Contact** — Tap phone or email to copy instantly with toast feedback
- **Social Links Grid** — X, Instagram, LinkedIn, GitHub, Telegram, YouTube, and personal website
- **Scannable QR Code** — Points to the personal site, regenerates on resize
- **Code128 Barcode** — Real, scannable barcode generated with JsBarcode
- **Photo Zoom** — Double-click the profile photo for a fullscreen preview
- **Fully Responsive** — Optimized for desktop, tablet, and all mobile sizes
- **SEO Optimized** — Meta tags, Open Graph, Twitter Card, and JSON-LD structured data
- **Accessible** — Keyboard-friendly, reduced-motion support, ARIA labels

---

## Tech Stack

| Layer   | Technology                                           |
| ------- | ---------------------------------------------------- |
| Markup  | HTML5                                                |
| Styling | CSS3, Tailwind CSS (CDN)                             |
| Logic   | Vanilla JavaScript                                   |
| Fonts   | Inter, JetBrains Mono, Space Grotesk, Dancing Script |
| Icons   | Font Awesome 6                                       |
| QR Code | qrcodejs                                             |
| Barcode | JsBarcode                                            |

No build step. No dependencies to install. Just open `index.html`.

---

## Project Structure

```
id/
├── src/
    |   main.js
    └── styles.css
├── index.html
└── README.md
```

The entire card lives in a single `index.html` file — styles, markup, and scripts are all inline. This keeps deployment dead-simple and makes the file portable.

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/aydope/id.git

# Open in browser
cd id
open index.html    # macOS
# or
start index.html   # Windows
# or
xdg-open index.html  # Linux
```

Or just drag index.html into any browser.

## Customization

All the personal data lives directly in `index.html`. Search for these strings and replace them:

## Keyboard & Interaction

| Action             | Result                                          |
| ------------------ | ----------------------------------------------- |
| Click card         | Flip front ↔ back                               |
| Drag card          | Rotate freely, snaps to nearest side on release |
| Double-click photo | Open fullscreen zoom                            |
| Click phone/email  | Copy to clipboard                               |
| Esc                | Close zoom modal                                |

## Deployment

1. This project is designed for GitHub Pages.
2. Push the repo to GitHub
3. Go to Settings → Pages
4. Under Source, select Deploy from a branch
5. Choose main and / (root)
6. Save

`The card will be live at https://<username>.github.io/<repo>/.`

## License

MIT — free to use, modify, and adapt. Attribution appreciated but not required.

## Author

**Mohammad Amin Sadeghi**

- Website: https://aydope.github.io
- GitHub: @aydope
- X: @\_aydope
- LinkedIn: /in/mohammad-amin-sadeghi
- Email: amin0xa1b@gmail.com
