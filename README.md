# Live-coding workshop kit

Two sides, one static site:

- **Main page (`index.html`)** - what participants see. A **Slides** link, the
  numbered **warm-up patterns** (`#1`, `#2`, ... - each opens a self-contained
  `strudel.cc` link), and one big **Join the live jam** button.
- **Organisers console (`organisers.html`)** - a private, unlinked page (nothing on
  the main page hints it exists) where you upload the slides PDF, edit the warm-up
  patterns, and oversee the live jams.

Under the hood, two things:

1. **Solo Strudel links** - self-contained `strudel.cc` links that open with the
   code already in the editor. No server; the code rides in the link.
2. **A Flok "jam" link** - one link you share that drops each person into a shared
   room of **up to 5 people**, always filling the fullest room that still has a
   seat. When a room fills, the next click starts a new room - **and if someone
   leaves a room, their seat frees up and the next person refills it.** Each new
   room also opens with a **different Hydra visual** (rotated from the
   `hydra.ojack.xyz` gallery).

Everything is static. **It hosts entirely on GitHub Pages - no backend, no
accounts, nothing else to deploy.** The organiser console saves changes by
committing to this repo through the **GitHub API** (you paste a token once), so
edits show up for every participant without any server.

---

## How the jam routing works (the leave-aware part)

Flok's editor keeps a live presence list (Yjs "awareness") and syncs it over a
public WebSocket at `wss://flok.cc/doc`, one room per session name. When you open
`join.html`, the page quietly connects to that socket **read-only** for each
candidate room (`myworkshop-...-0`, `-1`, ...), counts how many real people are
currently in each, then sends you to the **fullest room that isn't full yet**:

```
counts = [5, 2, 0, ...]  ->  join room 1   (room 0 full, room 1 fullest-with-space)
counts = [4, 5, 2, ...]  ->  join room 0   (someone left room 0 -> refill it first)
counts = [5, 5, 5, ...]  ->  open a fresh room
```

Because it reads **live** occupancy at the moment you click, a seat that opens up
when someone closes their tab is immediately reused - the thing the simple
counter couldn't do. The page never registers itself as a participant (it sets
its own presence to null and only counts entries that carry a real user).

---

## Files

| File | What it is |
|------|------------|
| `index.html` | **Main page** participants see: Slides link, numbered warm-up patterns (Open only), and the "Join the live jam" button. Builds itself from `data.json`. |
| `organisers.html` | **Organisers console** (unlinked/private): paste a GitHub token, upload the Slides PDF, edit/reorder/add/delete warm-up patterns, and oversee live jams. |
| `join.html` | The router. Reads live room occupancy and redirects to the fullest room with space. **This is the link you share for the group jam.** |
| `generator.html` | Paste any Strudel code, get a shareable link. Linked from the organiser console. |
| `config.js` | Static config: room naming, pane starter code, the GitHub repo target, and `HYDRA_SKETCHES` (the rotating visuals). |
| `data.json` | **Organiser-editable content**: the Slides PDF path + the warm-up patterns. The organiser console rewrites it via the GitHub API; `index.html` reads it. |
| `slides.pdf` | The uploaded slides (created/overwritten by the organiser console). |
| `vendor-yjs.js` | Bundled `yjs` + `y-websocket` (~100 KB) used to read Flok presence. No CDN at runtime; ship it as-is. |

---

## Setup (about 5 minutes, no accounts)

1. Put these files in a GitHub repo (root, or a `/docs` folder). Keep
   `vendor-yjs.js` next to `join.html`.
2. Repo **Settings -> Pages -> Build from branch -> `main` / root**.
3. Wait ~1 minute. Your hub is at `https://<you>.github.io/<repo>/`.

Optional: open `config.js` and change `SESSION_PREFIX` to your event name (keep
the random bit), and edit the starter code in `PANES` and `STRUDEL_PATTERNS`.

That's it - no counter to deploy this time.

---

## What to share

- **Main page (give this to participants):** `https://<you>.github.io/<repo>/`
- **Jam only (the magic link):** `https://<you>.github.io/<repo>/join.html`
- **Organisers console (keep this to yourself):**
  `https://<you>.github.io/<repo>/organisers.html` - it isn't linked from anywhere.

## Organiser console (`organisers.html`)

Open it and:

1. **Connect** - paste a GitHub **fine-grained Personal Access Token** with
   *Contents: Read and write* on this repo. It's stored in your browser only
   (localStorage), never committed. "Forget" clears it.
2. **Submit slides** - pick a PDF; it's uploaded as `slides.pdf` and the main page's
   **Slides** link points at it.
3. **Warm-up patterns** - title + Strudel code for each warm-up; reorder (↑/↓),
   delete, or add as many as you want, then **Save**.
4. **Oversee jams** - **Scan rooms** lists every jam that has people in it; open one
   to watch the visuals, run the synced code, and edit alongside the group. You join
   **invisibly** (with the `ORGANISER_NAME` from `config.js`), so you never use one of
   the 5 seats and the router's counter ignores you. *(Flok syncs code, not audio -
   press `Ctrl/Cmd+Enter` inside the embed to hear it.)*

Published changes go live for everyone within ~1 minute (GitHub Pages cache).

---

## Please test it once before the workshop

I built and unit-tested the routing logic, and verified from Flok's source that a
GitHub Pages page can read its presence cross-origin - but I could not run it
against the live flok.cc from where I built it. A 2-minute real-world check:

1. Open `join.html` in 5 browser windows (use incognito/guest windows so they
   count as separate people). Confirm the first 5 all land in **room 1**.
2. Open a 6th - it should land in **room 2**.
3. Close one of the room-1 windows, wait ~10 seconds, open a new `join.html` -
   it should send you **back to room 1** (the freed seat).

If something's off, tell me and I'll adjust. (If you connect the Claude-in-Chrome
extension, I can run this check for you.)

---

## Good to know / limits

- **Simultaneous clicks (rare):** occupancy is read at click time, so if a room
  has exactly 4 people and two people click in the same ~1-second window, both can
  land in it and briefly make 6. With people clicking a few seconds apart in a
  workshop this almost never happens; if you want a hard guarantee, that needs a
  small server to hand out seats atomically - ask and I'll add it.
- **Depends on flok.cc's public socket** staying stock `y-websocket` at
  `wss://flok.cc/doc` (verified from their current source). If Flok ever changes
  that, update `FLOK_HOST` in `config.js` or ping me.
- **Each join briefly opens up to `MAX_ROOMS` WebSocket probes** to flok.cc (then
  closes them). Default `MAX_ROOMS: 10` = up to 50 people. Raise it for bigger
  crowds.
- **Flok rooms are public.** Anyone with the link can join and code runs in the
  browser - share only within your group. The random `SESSION_PREFIX` keeps room
  names from clashing with strangers.
- **If presence can't be read** (e.g., flok.cc unreachable), `join.html` doesn't
  fail - it sends everyone to the first room so the session still happens.
- **Keep embedded code ASCII** (Strudel/Flok decode with `atob`): avoid emoji or
  curly quotes inside the patterns; plain quotes are fine.

---

## Changing the music later

- **Warm-up patterns + slides:** use the **organiser console** - no file editing.
- **Jam starter code / visuals:** edit `PANES` (the Strudel+Hydra panes a new room
  opens with) and `HYDRA_SKETCHES` (the rotating gallery visuals) in `config.js`,
  then commit. `STRUDEL_PATTERNS` in `config.js` is only the fallback used if
  `data.json` can't be fetched.
- **One-off link:** `generator.html` mints a standalone `strudel.cc` link.
