/* ============================================================
 *  Live-coding workshop - configuration  (edit this one file)
 *  Used by index.html, join.html and generator.html.
 *  Keep all embedded code ASCII (Strudel/Flok decode with atob).
 * ============================================================ */
window.WORKSHOP = {

  /* 1) Flok session naming.
   *    Flok sessions are GLOBAL + PUBLIC on flok.cc, so the prefix has a
   *    random token to avoid bumping into strangers' sessions. Rooms
   *    become: myworkshop-7f3a9-0, myworkshop-7f3a9-1, ...                */
  SESSION_PREFIX: "myworkshop-7f3a9-",
  MAX_PER_SESSION: 5,
  FLOK_BASE: "https://flok.cc/s/",

  /* 2) Where Flok's live presence lives. The flok.cc app syncs over a
   *    same-origin WebSocket at wss://flok.cc/doc, so we read occupancy
   *    from there. Only change FLOK_HOST if you run your own Flok server. */
  FLOK_HOST: "flok.cc",
  MAX_ROOMS: 10,   // how many rooms to check on each join (capacity = MAX_ROOMS * MAX_PER_SESSION)
  PROBE_MS: 1200,  // ms to wait for each room's presence before deciding

  /* 3) What each new Flok session opens with:
   *    4 Strudel editors + 1 Hydra editor, each pre-loaded with code.
   *    (Only the FIRST person into a room sets this up; the next people
   *    join the same live document and collaborate on it.)                */
  PANES: [
    { target: "strudel", code: '// drummer - Ctrl+Enter to play, Ctrl+. to stop\nsound("bd hh sd hh")' },
    { target: "strudel", code: '// bass\nnote("c2 eb2 g2 bb2").sound("sawtooth").lpf(800)' },
    { target: "strudel", code: '// chords\nn("0 2 4").scale("C:minor").sound("piano").room(.4)' },
    { target: "strudel", code: '// melody\nn("0 2 4 6 7").scale("C:minor").sound("triangle").delay(.3)' },
    { target: "hydra",   code: '// visuals - try changing the numbers\nosc(20,0.1,0.8).color(1,0.6,0.3).rotate(0.1).out()' },
  ],

  /* 4) Standalone strudel.cc patterns shown on the hub page.
   *    Each one becomes a self-contained https://strudel.cc/# link.      */
  STRUDEL_PATTERNS: [
    { title: "1 - First beat", code: '// drums - Ctrl+Enter to play, Ctrl+. to stop\nsound("bd hh sd hh")' },
    { title: "2 - Wobble bass", code: '// a wobbly bassline\nnote("c2 eb2 g2 bb2").sound("sawtooth").lpf(sine.range(300,1200).slow(4))' },
    { title: "3 - Chords + arp", code: '// chords + a little arpeggio\nstack(\n  n("0 2 4").scale("C:minor").sound("piano").slow(2).room(.4),\n  n("0 2 4 6 7 6 4 2").scale("C:minor").sound("triangle").delay(.3)\n)' },
    { title: "4 - Full groove", code: '// a whole little track - change any number and re-run\nsetcpm(120/4)\nstack(\n  sound("bd*2 ~ sd ~").bank("RolandTR909"),\n  sound("hh*8").gain(saw.range(.3,.8).fast(2)),\n  note("c2 ~ c2 g1").sound("sawtooth").lpf(700),\n  n("0 2 4 6").scale("C:minor").sound("piano").room(.5).gain(.6)\n)' },
  ],
};

/* ---- helpers (you normally don't need to touch these) ---- */

/* Matches how Strudel & Flok read code from a URL: they run
 * atob(decodeURIComponent(x)), so we run encodeURIComponent(btoa(x)). */
window.WORKSHOP.enc = function (code) {
  try { return encodeURIComponent(btoa(code)); }
  catch (e) { return encodeURIComponent(btoa(unescape(encodeURIComponent(code)))); }
};

/* A self-contained strudel.cc link that opens with `code` pre-filled. */
window.WORKSHOP.strudelLink = function (code) {
  return "https://strudel.cc/#" + window.WORKSHOP.enc(code);
};

/* The Flok session URL (with panes + starter code) for a session name. */
window.WORKSHOP.flokLink = function (sessionName) {
  var W = window.WORKSHOP;
  var targets = W.PANES.map(function (p) { return p.target; }).join(",");
  var hash = "#targets=" + targets;
  W.PANES.forEach(function (p, i) { hash += "&c" + i + "=" + W.enc(p.code); });
  return W.FLOK_BASE + sessionName + hash;
};

/* The WebSocket endpoint Flok uses for presence/sync. */
window.WORKSHOP.wsDocUrl = function () {
  return "wss://" + window.WORKSHOP.FLOK_HOST + "/doc";
};

/* Pure routing decision: given the live occupancy of rooms 0..N-1,
 * return the index of the fullest room that still has a free seat;
 * if every room is full, return the next (fresh) room index.
 * This both fills before opening a new room AND refills rooms that
 * lost people (their occupancy drops, so they become a target again). */
window.WORKSHOP.chooseRoomIndex = function (counts, max) {
  var target = -1, best = -1;
  for (var i = 0; i < counts.length; i++) {
    if (counts[i] < max && counts[i] > best) { best = counts[i]; target = i; }
  }
  return target === -1 ? counts.length : target;
};
