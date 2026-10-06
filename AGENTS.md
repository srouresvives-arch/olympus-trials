# Olympus workflow

Work on the `trials` branch by default. Root app files are Trials, published at `/olympus-trials/`.

The `main` branch's `official/` directory is the official release, published at `/olympus-trials/official/`. Do not change or promote that release unless the human user explicitly asks to publish an approved Trials version to official. Approval to update Trials is not approval to promote official.

Run `npm run check` and `npm test` before pushing Trials. Both branches carry the same two-environment deployment workflow; it always builds Trials from `trials` and official from `main`. A Trials deployment must never copy root app files over `official/`.

For an authorized promotion, use `scripts/promote-trials.cjs` in a main checkout with a separate clean Trials checkout and the exact approved commit SHA. Review the resulting diff and validate it before committing on main. Keep the two-environment workflow unchanged.

Preserve storage keys: Trials uses `oat5.*`; official uses `oa3.*`, `oa4.customPlans`, and `oa5.*`. Never reset, bulk clear or automatically merge the two environments. Both apps share the GitHub Pages origin, so existing browser data remains accessible under the respective keys.

Do not modify the old `file-too-big` repository for Olympus feature development. Its Olympus deployment and branches have been retired after migration.
