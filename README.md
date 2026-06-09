# Live-coding workshop kit

Two things, ready for a workshop:

1. **Solo Strudel links** - self-contained `strudel.cc` links that open with your
   code already in the editor. No server, no database; the code rides in the link.
2. **A Flok "jam" link** - one link you share that drops each person into a shared
   room of **up to 5 people**, always filling the fullest room that still has a
   seat. When a room fills, the next click starts a new room - **and if someone
   leaves a room, their seat frees up and the next person refills it.**

Everything is static. **It hosts entirely on GitHub Pages - no backend, no
accounts, nothing else to deploy.**

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
| `index.html` | The hub: warm-up Strudel buttons + the big "Join the jam" button. |
| `join.html` | The router. Reads live room occupancy and redirects to the fullest room with space. **This is the link you share for the group jam.** |
| `generator.html` | Paste any Strudel code, get a shareable link. For making more links later. |
| `config.js` | **The one file you edit.** Room naming, pane starter code, and the warm-up patterns. |
| `vendor-yjs.js` | Bundled `yjs` + `y-websocket` (~100 KB) used to read Flok presence. No CDN at runtime; ship it as-is. |
| `counter.ts` | Deprecated - left over from the old counter approach, not used anymore. Safe to delete. |

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

- **Hub (everything):** `https://<you>.github.io/<repo>/`
- **Jam only (the magic link):** `https://<you>.github.io/<repo>/join.html`
- **Solo Strudel links:** open the hub and hit "Copy link" on any pattern, or use
  `generator.html`. Each is a normal `https://strudel.cc/#...` URL.

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

Everything lives in `config.js` - edit `PANES` and `STRUDEL_PATTERNS`, commit,
done. Or use `generator.html` to mint a one-off link without touching anything.
