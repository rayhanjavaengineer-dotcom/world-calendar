# WORLD CALENDAR

**One World. Every Date. Every Moment.**

A responsive, standalone World Calendar starter project. It works on Windows laptops and Android phones. No build tools or package installation are required for this frontend version.

## Included in this ZIP
- Premium responsive homepage and navigation
- Full monthly calendar grid (all dates in the selected month)
- Full month date-by-date list view
- Previous/next month navigation
- Year selector (1900–2100)
- Sunday-first / Monday-first week setting
- Select a date to see date details
- Live clocks for Dhaka, London, New York, Tokyo, Dubai and Sydney
- Dark/light theme toggle
- Basic PWA manifest

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. For PWA/service-worker hosting or best local testing, use a local static server or publish the folder to GitHub Pages.

## Publish with GitHub Pages
1. Create a new GitHub repository, for example `world-calendar`.
2. Extract this ZIP.
3. Upload the **contents** of the `world-calendar` folder (not the ZIP itself) to the repository root.
4. Commit to the `main` branch.
5. In GitHub, open **Settings → Pages**.
6. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
7. Wait for GitHub Pages to publish the site.

## Android
- You can extract and upload the project using a file manager or GitHub mobile app/browser.
- Open the published GitHub Pages URL in Chrome.
- Use Chrome menu → **Add to Home screen** / **Install app** when available.

## Important project scope
This ZIP is **Phase 1: Frontend foundation**. The calendar uses the device's local Gregorian date and the browser's IANA time-zone support for the displayed world clocks. The backend, PostgreSQL database, user accounts, official holiday datasets, Hijri calculation/source selection, Bengali calendar conversion, event sync, reminders and admin panel are not implemented yet. They are planned for later phases and are not represented as completed.

## Project structure
```text
world-calendar/
├── index.html
├── manifest.json
├── css/styles.css
├── js/app.js
├── assets/favicon.svg
└── README.md
```
