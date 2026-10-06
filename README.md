# Olympus Athlete Trials

Independent static training app, V6. This repository contains only Olympus Trials and its own deployment and tests.

GitHub Pages: select **GitHub Actions** as the source under Settings → Pages. Pushes to main run syntax checks, functional tests and publish the app.

Sessions use 30 min legs/plyometrics, 30 min cardio intervals and 30 min full body. Reaction Grid issues visual and optional spoken cues; arrivals are entered manually.

Existing Trials data uses the unchanged `oat5.*` storage keys. Moving between paths on the same `https://srouresvives-arch.github.io` origin preserves access to that storage in the same browser/profile. A different browser or domain requires exporting BACKUP from the original app and importing it here. Import merges saved items without deleting existing entries. Active sessions retain their original plan snapshots.

`npm install`, `npm run check`, `npm test`.
