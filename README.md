# Olympus Athlete Trials

Independent Olympus repository with separate Trials and official environments.

- Trials: https://srouresvives-arch.github.io/olympus-trials/ — root app from the `trials` branch. V6 development and validation happen here first.
- Official: https://srouresvives-arch.github.io/olympus-trials/official/ — `official/` from the `main` branch. Initially migrated from the existing official app, with its previous workout plan unchanged.

Updating Trials never automatically promotes official. Promotion requires explicit human approval of a specific Trials commit. In a clean main checkout, run `node scripts/promote-trials.cjs <separate-clean-trials-checkout> <approved-commit-sha>`, review and validate the resulting official directory, then commit on main. The helper converts storage keys and environment labels; it does not commit or publish on its own. See AGENTS.md.

GitHub Pages uses **GitHub Actions**. Pushes to main or trials validate and publish both environments from their separate branches.

Sessions use 30 min legs/plyometrics, 30 min cardio intervals and 30 min full body. Reaction Grid issues visual and optional spoken cues; arrivals are entered manually.

Existing Trials data uses the unchanged `oat5.*` storage keys. Moving between paths on the same `https://srouresvives-arch.github.io` origin preserves access to that storage in the same browser/profile. A different browser or domain requires exporting BACKUP from the original app and importing it here. Import merges saved items without deleting existing entries. Active sessions retain their original plan snapshots.

`npm install`, `npm run check`, `npm test`.
