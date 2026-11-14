# AUCIS — Air University Kamra

Website for **AUCIS**, the student computing and innovation society of Air University, Kamra Campus.

Dark, animated theme: a spread-wing eagle emblem, drifting colour fields, and scroll-reveal sections.
Palette: `#0D1B2A` · `#1B263B` · `#415A77` · `#778D7A` · `#D4C4A8` · `#F4F1DE`.

## Pages

| Route      | Content                                                                   |
| ---------- | ------------------------------------------------------------------------- |
| `/`        | Hero (logo, tagline, Join), short intro, upcoming-event highlight, links   |
| `/about`   | Mission, vision, objectives, what AUCIS does, why it exists                |
| `/team`    | Supervisors, Executive Body, Core Roles                                   |
| `/events`  | Upcoming and past events (event cards: poster, title, date, venue, text)   |
| `/join`    | Who can join, benefits, code of conduct, application form                  |
| `/contact` | Email, socials, campus location, message form                              |

## Editing content

Everything textual lives in **`src/data/site.js`**: society intro, tagline, team members,
supervisors, events, benefits, code of conduct and contact details. Placeholders render as
graceful "coming soon" states until you fill them in.

- **Team:** add `{ name, role, note, photo }` to `supervisors`, `executiveBody` or `coreRoles`.
- **Events:** add to `upcomingEvents` / `pastEvents`:
  `{ title, date, venue, description, poster, registerUrl }`.
- **Contact:** set `site.email` and add `{ label, href, icon }` entries to `site.socials`.

## Running

```bash
docker compose -f docker-compose.base44.yml up -d --build   # http://localhost:3000
```

One container runs two processes: the Vite dev server on port 3000 and a small Express API on
`127.0.0.1:4000`. Vite proxies `/api` to it, so the site is single-origin.

| Endpoint              | Purpose                                    |
| --------------------- | ------------------------------------------ |
| `GET /api/health`     | Liveness                                   |
| `POST /api/applications` | Join-us form → `applications.jsonl`      |
| `POST /api/messages`  | Contact form → `messages.jsonl`            |

Submissions are appended as JSON lines to the `api_data` volume (`/data`). Reading them:

```bash
docker compose -f docker-compose.base44.yml exec web cat /data/applications.jsonl
```
