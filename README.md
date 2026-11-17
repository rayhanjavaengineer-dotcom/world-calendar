# WORLD CALENDAR v2.0
**One World. Every Date. Every Moment.**

## v2.0
- Midnight date rollover and tab-return refresh
- Month List link switches to List view
- Smart selection and month navigation day clamping
- Persistent dark/light theme and week-start preference
- Mobile menu auto-close
- Improved mobile calendar sizing and touch targets
- Year selector dynamically expands beyond 1900–2100
- 192×192 and 512×512 PNG PWA icons
- Service worker app-shell cache for offline use after first successful online visit
- Better accessible labels, focus indicators, pressed states and reduced-motion support
- Preserves full month grid/list, date details, Today controls and six world clocks

## GitHub Pages update
Upload the contents of this folder to the root of your existing `world-calendar` repository, replacing old versions and adding `service-worker.js` and `assets/icons/`. Keep paths exact. Commit to `main`.

## Offline
Offline mode becomes available only after the first successful online visit and service-worker cache installation. HTTPS is required; GitHub Pages provides HTTPS.

## Scope
Frontend release only. Backend, accounts, official holiday feeds, Bengali/Hijri conversion, cloud sync, reminders and admin features are not included yet.
