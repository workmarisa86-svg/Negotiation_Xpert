# Negotiation Xpert

A voice-based negotiation training game that runs entirely in the browser. You speak out loud to a scripted counterpart, and your coach, **Iris Calloway**, names the technique you used, rates it and suggests what to try next.

- 50 scenarios across 5 difficulty levels and 6 categories, from a fruit market to a crisis call
- Push-to-talk speech recognition and spoken counterpart lines (browser Web Speech API), with a typing fallback
- Full English / Español switch, including mid-negotiation, speech recognition and voices
- Coach Mode (live feedback and hints) and Challenge Mode (review only at the end)
- Technique detection for mirroring, labeling, calibrated questions, "no"-oriented questions, accusation audits, summaries / "that's right", and Ackerman bargaining, plus common mistakes
- Glossary with expandable explanations, a statistics dashboard and professional credentials
- No frameworks, no AI, no server, no external requests. History is saved in `localStorage`.

## Run locally

Open `index.html` in a browser, or serve the folder so that speech recognition can use the microphone:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Voice input works in Chrome, Edge and Safari. Firefox does not support speech recognition, so typing is used there.

## Tests

```bash
node tests/run-tests.js       # add -v for a per-scenario summary
```

The tests cover detector cases in both languages and validate every scenario's data. They also simulate full playthroughs of every scenario in English and Spanish: a skilled player must win, while a careless player and a one-technique player (Medium and above) must not.

## Project structure

```
index.html
css/styles.css            design system (light and dark themes, responsive)
js/icons.js               line icons
js/i18n.js                interface text, coach feedback and coach phrases (EN/ES)
js/glossary.js            glossary and technique library (EN/ES)
js/detector.js            technique, mistake, number and time detection (EN/ES)
js/lines.js               reusable counterpart dialogue and pressure tactics, by register
js/engine.js              the negotiation engine (no DOM)
js/scenarios/*.js         scenario data, one file per difficulty level
js/store.js               saved history, statistics aggregation, credentials
js/speech.js              speech recognition and synthesis
js/app.js                 views, routing and interaction
tests/run-tests.js        automated tests
```

## Adding a scenario

Scenarios are plain data. Add an object to the file for the right level (for example `js/scenarios/2-easy.js`):

```js
{
  id: 'unique-id', level: 'easy', category: 'everyday',  // everyday | home | work | business | crisis | expert
  type: 'deal',                // 'deal' = negotiate a number; 'resolve' = reach a resolution (crisis-style)
  register: 'service',         // counterpart voice: casual | service | business | crisis
  unit: 'usd', start: 100, target: 70, step: 5,   // units: usd, usdmo, usdsh, pct, days, dpw, mins, hours, count, time
  who: { name: 'Sam', gender: 'm', role: L('Shop owner', 'Dueño de la tienda') },
  title: L('…', '…'), brief: L('…', '…'),
  goal: L('Pay {target} or less. They ask {start}.', 'Paga {target} o menos. Piden {start}.'),
  item: L('the item', 'el artículo'),
  open: L('It costs {price}.', 'Cuesta {price}.'),
  motives: [L('hidden motivation 1', '…'), L('…', '…'), L('…', '…')],  // revealed by good technique; shuffled in Random mode
  deal: L('{price}. Deal.', '{price}. Trato hecho.'),
  nodeal: L('…', '…'),
  tip: L('Coach preparation note', 'Nota de preparación'),
  // optional: tactics: ['deadline', 'anchoring'], spot: true, ackerman: false, tension0, maxTurns,
  //           resolve-only: milestones: [3 lines], fail, timeout; endNotes: [safety tips]
}
```

Then run `node tests/run-tests.js` to check that the new scenario is complete and winnable.

## Publish on GitHub Pages

1. Push this repository to GitHub (it already contains everything Pages needs: `index.html` at the root and a `.nojekyll` file).
2. On GitHub, open the repository and go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the branch you want to publish (for example `main`) and the **/ (root)** folder, then click **Save**.
5. Wait a minute or two. The site appears at `https://<your-username>.github.io/<repository-name>/`, and the address is shown at the top of the Pages settings page.

GitHub Pages serves over HTTPS, which browsers require before they allow microphone access. The first time you press the microphone button, allow access when the browser asks.
