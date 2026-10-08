# Digital Identity Card

A personal digital ID card built with vanilla HTML, CSS and JavaScript. Black, white and gray brushed-steel design with a 3D flip, a periodic light sheen and a scannable QR code and barcode.

Live demo: [aydope.github.io/id](https://aydope.github.io/id/)

## Features

- 3D flip: drag to rotate freely or click to flip, snaps to the nearest side on release
- Brushed-steel card with a light sheen that sweeps across every few seconds
- Front: photo, name, role, ID number, nationality, date of birth, issue and expiry dates, signature, EMV chip, MRZ strip
- Back: click-to-copy phone and email, social links, QR code, Code128 barcode
- Photo zoom on double-click
- Scales as one piece from desktop to small phones
- Keyboard accessible, reduced-motion support, ARIA labels
- SEO: meta tags, Open Graph, Twitter Card, JSON-LD

## Tech stack

| Layer   | Technology                                           |
| ------- | ---------------------------------------------------- |
| Markup  | HTML5                                                |
| Styling | CSS3                                                 |
| Logic   | Vanilla JavaScript                                   |
| Fonts   | Inter, JetBrains Mono, Space Grotesk, Dancing Script |
| Icons   | Font Awesome 6                                       |
| QR code | qrcodejs                                             |
| Barcode | JsBarcode                                            |

No build step.

## Project structure

```
id/
├── src/
│   ├── main.js
│   └── styles.css
├── index.html
├── README.md
└── LICENSE
```

## Quick start

```bash
git clone https://github.com/aydope/id.git
cd id
```

Open `index.html` in a browser, or serve the folder with any static server so the relative `src/` paths resolve:

```bash
python3 -m http.server 8000
```

## Interaction

| Action             | Result                               |
| ------------------ | ------------------------------------ |
| Click card         | Flip front and back                  |
| Drag card          | Rotate freely, snaps to nearest side |
| Enter / Space      | Flip (card focused)                  |
| Double-click photo | Open fullscreen zoom                 |
| Click phone/email  | Copy to clipboard                    |
| Esc                | Close zoom                           |

## Note

The card is a personal design piece. "Digital Identity Authority" is fictional, and the card is not an official or verified identity document.

## License

MIT

## Author

**Mohammad Amin Sadeghi** — [aydope.github.io](https://aydope.github.io) · [@aydope](https://github.com/aydope)
