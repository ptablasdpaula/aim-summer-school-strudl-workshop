/* ============================================================
 *  Live-coding workshop - configuration  (edit this one file)
 *  Used by index.html, organisers.html, join.html, generator.html.
 *  Keep all embedded code ASCII (Strudel/Flok/Hydra decode with atob).
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

  /* The username the organiser "Oversee jams" view joins rooms with.
   * The seat counter (join.html) ignores anyone with this name, so an
   * organiser watching/editing a room never takes up one of the 5 seats. */
  ORGANISER_NAME: "organiser-view",

  /* 3) The shared, organiser-editable data (slides PDF + warm-up patterns)
   *    lives in this JSON file in the repo. The organiser page rewrites it
   *    through the GitHub API; index.html reads it at load. STRUDEL_PATTERNS
   *    below is only the seed/fallback if data.json can't be fetched.       */
  DATA_PATH: "data.json",

  /* GitHub repo the organiser page writes to (slides + data.json).
   * Uses a fine-grained Personal Access Token with Contents: read/write,
   * pasted by the organiser at runtime (kept in their browser only).        */
  GITHUB: {
    owner: "ptablasdpaula",
    repo: "aim-summer-school-strudl-workshop",
    branch: "main",
    dataPath: "data.json",
    slidesPath: "slides.pdf",
  },

  /* 4) What each new Flok session opens with:
   *    4 Strudel editors + 1 Hydra editor. The Strudel panes use the code
   *    below; the Hydra pane is filled per-room from HYDRA_SKETCHES (so each
   *    jam gets a different visual). Only the FIRST person into a room sets
   *    this up; later people join the same live document.                   */
  PANES: [
    { target: "strudel", code: '// drummer - Ctrl+Enter to play, Ctrl+. to stop\nsound("bd hh sd hh")' },
    { target: "strudel", code: '// bass\nnote("c2 eb2 g2 bb2").sound("sawtooth").lpf(800)' },
    { target: "strudel", code: '// chords\nn("0 2 4").scale("C:minor").sound("piano").room(.4)' },
    { target: "strudel", code: '// melody\nn("0 2 4 6 7").scale("C:minor").sound("triangle").delay(.3)' },
    { target: "hydra",   code: '// visuals\nosc(20,0.1,0.8).color(1,0.6,0.3).rotate(0.1).out()' },
  ],

  /* Hydra visuals rotated per jam room (room i gets HYDRA_SKETCHES[i % len]).
   * The hydra.ojack.xyz gallery (ojack/hydra examples.json), ASCII-safe sketches
   * only so they embed cleanly in the Flok URL; each tag is the sketch_id.
   * Add/replace/reorder freely.                                             */
  HYDRA_SKETCHES: [
    /* example_0 */ "//Flor de Fuego\n\nshape(200,0.5,1.5)\n.scale(0.5,0.5)\n.color([0.5,2].smooth(1),0.3,0)\n.repeat(2,2)\n.modulateScale(osc(3,0.5),-0.6)\n.add(o0,0.5)\n.scale(0.9)\n.out()",
    /* example_3 */ "// by Olivia Jack\n\nosc(20, 0.03, 1.7).kaleid().mult(osc(20, 0.001, 0).rotate(1.58)).blend(o0, 0.94).modulateScale(osc(10, 0),-0.03).scale(0.8, () => (1.05 + 0.1 * Math.sin(0.05*time))).out(o0)",
    /* example_4 */ "// by Nelson Vera\n// twitter: @nel_sonologia\n\nosc(8,-0.5, 1).color(-1.5, -1.5, -1.5).blend(o0).rotate(-0.5, -0.5).modulate(shape(4).rotate(0.5, 0.5).scale(2).repeatX(2, 2).modulate(o0, () => mouse.x * 0.0005).repeatY(2, 2)).out(o0)",
    /* example_8 */ "// by Rodrigo Velasco\n// https://yecto.github.io/\n\nosc(107, 0, 0.7).color(1, 0, 1).rotate(0, -0.08).modulateRotate(o1, 0.4).out(o0)\nosc(33).rotate(2, 0.8).modulateRotate(o0, () => (a.fft[0]*2)).out(o1)",
    /* example_9 */ "// by Rodrigo Velasco\n// https://yecto.github.io/\n\nosc(18, 0.1, 0).color(2, 0.1, 2)\n.mult(osc(20, 0.01, 0)).repeat(2, 20).rotate(0.5).modulate(o1)\n.scale(1, () =>  (a.fft[0]*0.9 + 2)).diff(o1).out(o0)\nosc(20, 0.2, 0).color(2, 0.7, 0.1).mult(osc(40)).modulateRotate(o0, 0.2)\n.rotate(0.2).out(o1)",
    /* example_10 */ "// by Zach Krall\n// http://zachkrall.online/\n\nosc( 215, 0.1, 2 )\n.modulate(\n  osc( 2, -0.3, 100 )\n  .rotate(15)\n)\n.mult(\n  osc( 215, -0.1, 2)\n  .pixelate( 50, 50 )\n)\n.color( 0.9, 0.0, 0.9 )\n.modulate(\n  osc( 6, -0.1 )\n  .rotate( 9 )\n)\n.add(\n  osc( 10, -0.9, 900 )\n  .color(1,0,1)\n)\n.mult(\n  shape(900, 0.2, 1)\n  .luma()\n  .repeatX(2)\n  .repeatY(2)\n  .colorama(10)\n)\n.modulate(\n  osc( 9, -0.3, 900 )\n  .rotate( 6 )\n)\n.add(\n  osc(4, 1, 90)\n  .color(0.2,0,1)\n)\n.out()",
    /* example_11 */ "// by Zach Krall\n// http://zachkrall.online/\n\nosc(10, 0.9, 300)\n.color(0.9, 0.7, 0.8)\n.diff(\n  osc(45, 0.3, 100)\n  .color(0.9, 0.9, 0.9)\n  .rotate(0.18)\n  .pixelate(12)\n  .kaleid()\n)\n.scrollX(10)\n.colorama()\n.luma()\n.repeatX(4)\n.repeatY(4)\n.modulate(\n  osc(1, -0.9, 300)\n)\n.scale(2)\n.out()",
    /* example_13 */ "// acid bus seat\n// by Will Humphreys\n// https://github.com/TheWispy\n\nosc(105).color(0.5,0.1,0.8).rotate(0.11, 0.1).modulate(osc(10).rotate(0.3).add(o0, 0.1)).add(osc(20,0.01,1).color(0,0.8,1)).out(o0)\nosc(50,0.05, 0.7).color(1,0.7,0.5).diff(o0).modulate(o1,0.05).out(o1)\nrender(o1)",
    /* example_14 */ "// by Olivia Jack\n// @_ojack_\n\nosc(20, 0.01, 1.1)\n  .kaleid(5)\n  .color(2.83,0.91,0.39)\n  .rotate(0, 0.1)\n  .modulate(o0, () => mouse.x * 0.0003)\n  .scale(1.01)\n    .out(o0)",
    /* example_15 */ "// by Olivia Jack\n// https://ojack.github.io\n\nosc(100, 0.01, 1.4)\n  .rotate(0, 0.1)\n  .mult(osc(10, 0.1).modulate(osc(10).rotate(0, -0.1), 1))\n  .color(2.83,0.91,0.39)\n  .out(o0)",
    /* example_16 */ "// by Olivia Jack\n// https://ojack.github.io\n\nosc(4, 0.1, 0.8).color(1.04,0, -1.1).rotate(0.30, 0.1).pixelate(2, 20).modulate(noise(2.5), () => 1.5 * Math.sin(0.08 * time)).out(o0)",
    /* example_17 */ "// moire\n// by Olivia Jack\n// twitter: @_ojack_\n\npattern = () => osc(200, 0).kaleid(200).scale(1, 0.4)\n//\npattern()\n  .scrollX(0.1, 0.01)\n  .mult(pattern())\n  .out()",
    /* example_18 */ "// by Olivia Jack\n// https://ojack.github.io\n\nosc(6, 0, 0.8)\n  .color(1.14, 0.6,.80)\n  .rotate(0.92, 0.3)\n  .pixelate(20, 10)\n  .mult(osc(40, 0.03).thresh(0.4).rotate(0, -0.02))\n  .modulateRotate(osc(20, 0).thresh(0.3, 0.6), () => 0.1 + mouse.x * 0.002)\n  .out(o0)",
    /* rangga_0 */ "// Dreamy Diamond\n// by Rangga Purnama Aji\n// https://ranggapurnamaaji1.wixsite.com/portfolio\n\nosc(7,-0.125).modulate(voronoi(1)).diff(voronoi(1).mult(gradient(-1).luma(0.125)))\n  .luma(0.125)\n  .add(shape(7, 0.5)\n       .mult(voronoi(10,2).blend(o0).diff(gradient(1)).modulate(voronoi())))\n  .scrollY(-0.1)\n  .scrollX(0.125)\n  .blend(o0)\n  .blend(o0)\n  .out()",
    /* rangga_1 */ "// Tag & Sweep\n// by Rangga Purnama Aji\n// https://ranggapurnamaaji1.wixsite.com/portfolio\n\nosc(5,0.125).colorama(1)\n  .luma(0.125).add(shape(1,0.5).luma(2).diff(gradient(1)))\n  .diff(osc(-1,-0.25)).blend(o0).color(0,2.5,1.75)\n  .out()",
    /* rangga_2 */ "// Monochrome Memoar\n// by Rangga Purnama Aji\n// https://ranggapurnamaaji1.wixsite.com/portfolio\n\nvoronoi(50,1)\n  .luma(0.5).add(shape(1,1).luma(1))\n  .modulate(osc(-1000,-1)\n            .modulate(osc().luma()))\n  .blend(o0)\n  .blend(o0)\n  .blend(o0)\n  .blend(o0)\n  .out()",
    /* rangga_3 */ "// Galaxy Trip\n// by Rangga Purnama Aji\n// https://ranggapurnamaaji1.wixsite.com/portfolio\n\nshape(1,1)\n  .mult(voronoi(1000,2)\n  .blend(o0).luma())\n  .add(shape(3,0.125)\n       .rotate(1,1).mult(voronoi(1000,1).luma())\n       .rotate(1.5)).scrollX([0.1,-0.0625,0.005,0.00001],0)\n  .scrollY([0.1,-0.0625,0.005,0.00001],0)\n  .out()",
    /* rangga_4 */ "// Sumet\n// by Rangga Purnama Aji\n// https://ranggapurnamaaji1.wixsite.com/portfolio\n\nosc(0.5,1.25).mult(shape(1,0.09).rotate(1.5))\n  .diff(gradient())\n  .add(shape(2,2).blend(gradient(1)))\n  .modulate(noise()\n            .modulate(noise().scrollY(1,0.0625)))\n  .blend(o0)\n  .color(1,-0.5,-0.75)\n  .out()",
    /* marianne_0 */ "//port\n//by Marianne Teixido\n//https://marianneteixido.github.io/\n\nosc(5, 0.9, 0.001)\n    .kaleid([3,4,5,7,8,9,10].fast(0.1))\n    .color(0.5, 0.3)\n    .colorama(0.4)\n    .rotate(0.009,()=>Math.sin(time)* -0.001 )\n    .modulateRotate(o0,()=>Math.sin(time) * 0.003)\n    .modulate(o0, 0.9)\n    .scale(0.9)\n    .out(o0)",
    /* marianne_1 */ "//Pixelscape\n//Marianne Teixido\n//https://github.com/MarianneTeixido\n\nsrc(o0)\n .saturate(1.01)\n .scale(.999)\n .color(1.01,1.01,1.01)\n .hue(.01)\n .modulateHue(src(o1).hue(.3).posterize(-1).contrast(.7),2)\n  .layer(src(o1)\n         .luma()\n         .mult(gradient(1)\n               .saturate(.9)))\n  .out(o0)\n\nnoise(1, .2)\n  .rotate(2,.5)\n  .layer(src(o0)\n  .scrollX(.2))\n  .out(o1)\n\nrender(o0)",
    /* naoto_0 */ "// @naoto_hieda\nosc(20, 0.1, 0).color(0, 1, 2).rotate(1.57/2).out(o1)\nosc(30, 0.01, 0).color(2, 0.7, 1).modulate(o1, 0).add(o1,1).modulatePixelate(o1,1,10).out(o0)",
    /* naoto_1 */ "// @naoto_hieda\nsolid(0.2,0.6,0.9).layer(osc(31.4,0).thresh(0.7).luma().modulate(osc(4,1).rotate(1),0.05).color(0,0,0)).layer(osc(31.4,0).thresh(0.7).luma().modulate(osc(4,1).rotate(1),0.1)).out()",
    /* ritchse_0 */ "//random trypophobia - changes everytime you load it!\n//by Ritchse\n//instagram.com/ritchse\n \nfunction r(min=0,max=1) { return Math.random()*(max-min)+min; }\n \nsolid(1,1,1)\n    .diff(shape([4,4,4,24].smooth().fast(.5),r(0.6,0.93),.09).repeat(20,10))\n  .modulateScale(osc(8).rotate(r(-.5,.5)),.52)\n  .add(\n      src(o0).scale(0.965).rotate(.012*(Math.round(r(-2,1))))\n      .color(r(),r(),r())\n      .modulateRotate(o0,r(0,0.5))\n      .brightness(.15)\n      ,.7)\n  .out()",
    /* ritchse_1 */ "//corrupted screensaver\n//by Ritchse\n//instagram.com/ritchse\n \nvoronoi(350,0.15)\n    .modulateScale(osc(8).rotate(Math.sin(time)),.5)\n    .thresh(.8)\n  .modulateRotate(osc(7),.4)\n  .thresh(.7)\n    .diff(src(o0).scale(1.8))\n  .modulateScale(osc(2).modulateRotate(o0,.74))\n  .diff(src(o0).rotate([-.012,.01,-.002,0]).scrollY(0,[-1/199800,0].fast(0.7)))\n  .brightness([-.02,-.17].smooth().fast(.5))\n  .out()",
    /* ritchse_2 */ "//tropical juice\n//by Ritchse\n//instagram.com/ritchse\n \nvoronoi(2,0.3,0.2).shift(0.5)\n.modulatePixelate(voronoi(4,0.2),32,2)\n.scale(()=>1+(Math.sin(time*2.5)*0.05))\n.diff(voronoi(3).shift(0.6))\n.diff(osc(2,0.15,1.1).rotate())\n.brightness(0.1).contrast(1.2).saturate(1.2)\n  .out()\nspeed = 0.8",
    /* ritchse_3 */ "//trying to get closer\n//by Ritchse\n//instagram.com/ritchse\n \nosc(60,-0.015,0.3).diff(osc(60,0.08).rotate(Math.PI/2))\n  .modulateScale(noise(3.5,0.25).modulateScale(osc(15).rotate(()=>Math.sin(time/2))),0.6)\n  .color(1,0.5,0.4).contrast(1.4)\n  .add(src(o0).modulate(o0,.04),.6)\n  .invert().brightness(0.1).contrast(1.2)\n  .modulateScale(osc(2),-0.2)\n  .out()",
    /* ritchse_4 */ "// disintegration\n// by Ritchse\n// instagram.com/ritchse\n \nosc(5,.1).modulate(noise(6),.22).diff(o0)\n    .modulateScrollY(osc(2).modulate(osc().rotate(),.11))\n  .scale(.72).color(0.99,1.014,1)\n    .out()",
    /* flor_0 */ "//Flor de Fuego\n//https://flordefuego.github.io/\nosc(30,0.01,1)\n.mult(osc(20,-0.1,1).modulate(noise(3,1)).rotate(0.7))\n.posterize([3,10,2].fast(0.5).smooth(1))\n.modulateRotate(o0,()=>mouse.x*0.003)\n.out()",
    /* mahalia_0 */ "// Mahalia H-R\n// IG: @mm_hr_\n\nshape(20,0.1,0.01)\n  .scale(() => Math.sin(time)*3)\n  .repeat(() => Math.sin(time)*10)\n  .modulateRotate(o0)\n  .scale(() => Math.sin(time)*2)\n  .modulate(noise(2,0))\n  .rotate(0.1, 0.9)\n.out(o0)\n\nsrc(o0)\n.modulate(osc(500,0,0))\n.out(o1)\n\nsrc(o1)\n.modulateKaleid(voronoi(() => Math.sin(time)*3,0.1,0.01),() => Math.sin(time)*3)\n.scale(() => Math.sin(time)*3)\n.out(o2)\n\nrender(o2)",
    /* mahalia_1 */ "// Mahalia H-R\n// IG: @mm_hr_\n\nshape(() => Math.sin(time)+1*2)\n.rotate(() => Math.PI * mouse.x /180)\n.repeatX(3)\n.repeatY(()=>Math.sin(time)*5)\n.scale(() => Math.PI/4)\n.blend(src(o0).color(1,0,0))\n.modulate(osc(20, 0,.4))\n.kaleid(2)\n .out(o0)\n\nrender(o0)",
    /* mahalia_2 */ "// Velvet Pool\n// by Mahalia H-R\n// IG: mm_hr_\n\n\nnoise()\n.color(() => a.fft[2]*2,0,.6)\n.modulate(noise(() => a.fft[0]*10))\n.scale(()=> a.fft[2]*5)\n.layer(\n  src(o0)\n  .mask(osc(10).modulateRotate(osc(),90,0))\n  .scale(() => a.fft[0]*2)\n  .luma(0.2,0.3)\n)\n.blend(o0)\n.out(o0)\n\nosc()\n.modulate(noise(() => a.fft[1]+5))\n.color(1,0,0)\n.out(o1)\n\nsrc(o0)\n.modulate(o1)\n.layer(\n  src(o1)\n  .mask(o1)\n  .saturate(7)\n)\n.modulateRotate(o1)\n.rotate(({time}) => time%360*0.05)\n.out(o2)\n\nrender(o2)",
    /* mahalia_3 */ "// by Mahalia H-R\n// IG: mm_hr_\n\nshape(()=>Math.sin(time)+1*3, .5,.01)\n.repeat(5,3, ()=>a.fft[0]*2, ()=>a.fft[1]*2)\n.scrollY(.5,0.1)\n.layer(\n  src(o1)\n  .mask(o0)\n  .luma(.01, .1)\n  .invert(.2)\n)\n.modulate(o1,.02)\n.out(o0)\n\nosc(40, 0.09, 0.9)\n.color(.9,0,5)\n.modulate(osc(10).rotate(1, 0.5))\n.rotate(1, 0.2)\n.out(o1)\n\nrender(o0)",
    /* mahalia_4 */ "// Cellular & Blobular\n// by Mahalia H-R\n// IG: mm_hr_\n\nspeed = 0.3\n\nshape(20,0.2,0.3)\n.color(0.5,0.8,50)\n  .scale(() => Math.sin(time)+1*2)\n  .repeat(() => Math.sin(time)*10)\n  .modulateRotate(o0)\n  .scale(() => Math.sin(time)+1 *1.5)\n  .modulate(noise(2,2))\n  .rotate(1, .2)\n  // .invert(2.4)\n.out(o0)",
    /* flor_1 */ "//Hydra Glitchy Slit Scan\n//Flor de Fuego\n//https://flordefuego.github.io/ \ns0.initCam()\nsrc(s0).saturate(2).contrast(1.3).layer(src(o0).mask(shape(4,2).scale(0.5,0.7).scrollX(0.25)).scrollX(0.001)).modulate(o0,0.001).out(o0)",
    /* flor_2 */ "//Glitch River\n//Flor de Fuego\n//https://flordefuego.github.io/\nvoronoi(8,1)\n.mult(osc(10,0.1,()=>Math.sin(time)*3).saturate(3).kaleid(200))\n.modulate(o0,0.5)\n.add(o0,0.8)\n.scrollY(-0.01)\n.scale(0.99)\n.modulate(voronoi(8,1),0.008)\n.luma(0.3)\n.out()\n\n\nspeed = 0.1",
    /* nesso_0 */ "\n//clouds of passage\n//by Nesso\n//www.nesso.xyz\n\nshape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7].smooth(1))\n.color(0.2,0.4,0.3)\n.scrollX(()=>Math.sin(time*0.27))\n.add(\n  shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.5,0.3].smooth(1))\n  .color(0.6,0.2,0.5)\n  .scrollY(0.35)\n  .scrollX(()=>Math.sin(time*0.33)))\n.add(\n  shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.3].smooth(1))\n  .color(0.2,0.4,0.6)\n  .scrollY(-0.35)\n  .scrollX(()=>Math.sin(time*0.41)*-1))\n.add(\n      src(o0).shift(0.001,0.01,0.001)\n      .scrollX([0.05,-0.05].fast(0.1).smooth(1))\n      .scale([1.05,0.9].fast(0.3).smooth(1),[1.05,0.9,1].fast(0.29).smooth(1))\n      ,0.85)\n.modulate(voronoi(10,2,2))\n.out()",
    /* malitzin_0 */ "//CNDSD\n//http://malitzincortes.net/\n// sand spirals\n\nosc(3, 0.01, 0.4)\n.color(1.2,1.2,1.3)\n.saturate(0.4)\n.modulateRepeat(osc(2),1, 2, 4, 3)\n.modulateKaleid(osc(12,0.05,0),1)\n.luma (0.4)\n.rotate(4, 0.1,0)\n.modulate(o0, () => mouse.y *0.0002 )\n.scale(1).diff(o1)\n.out(o0)",
    /* malitzin_1 */ "//CNDSD\n//http://malitzincortes.net/\n//ameba\n\nosc(15, 0.01, 0.1).mult(osc(1, -0.1).modulate(osc(2).rotate(4,1), 20))\n.color(0,2.4,5)\n.saturate(0.4)\n.luma(1,0.1, (6, ()=> 1 + a.fft[3]))\n.scale(0.7, ()=> 0.7 + a.fft[3])\n.diff(o0)// o0\n.out(o0)// o1",
    /* malitzin_2 */ "//CNDSD\n//http://malitzincortes.net/\n//crazy squares\n\nshape(4, (0.01, ()=> 0.2 + a.fft[2]),1)\n.mult(osc(1, 1).modulate(osc(5).rotate(1.4,1),3))\n.color(1,2,4)\n.saturate(0.2)\n.luma(1.2,0.05, (5, ()=> 2 + a.fft[3]))\n.scale(0.6, ()=> 0.9 + a.fft[3])\n.diff(o0)// o0\n.out(o0)// o1",
    /* khoparzi_0 */ "// Happy Mandala\n// By Abhinay Khoparzi\n// twitter/github/instagram: @khoparzi\nvoronoi(5,-0.1,5)\n.add(osc(1,0,1)).kaleid(21)\n.scale(1,1,2).colorama().out(o1)\nsrc(o1).mult(src(s0).modulateRotate(o1,100), -0.5)\n  .out(o0)",
    /* khoparzi_1 */ "// Perpetual elevator buttons\n// By Khoparzi\n// http://khoparzi.com\n\nshape(3).add(osc(1,0.5,1), 1)\n  .add(o1, () => (Math.sin(time/4) * 0.7 + 0.1))\n  //.repeat(5)\n    .scale(()=>Math.sin(time / 16)).rotate(0, -0.1)\n  .out(o1)\n\nsrc(o1)\n  .rotate(0,0.1)\n  .out()",
    /* khoparzi_2 */ "// Really Love\n// by Abhinay Khoparzi\n// http://khoparzi.com\nosc(100,-0.01245,1).pixelate(50).kaleid(()=>(Math.sin(time/8)*9+3)).rotate(0,0.125)\n.modulateRotate(shape(3).scale(()=>(Math.cos(time)*2)).rotate(0,-0.25)).diff(src(o0).brightness(0.3))\n  .out()",
    /* khoparzi_3 */ "// Aqautic blubs\n// By Khoparzi\n// https://khoparzi.com\n\ngradient(0.25)\n.add(noise(), ()=>Math.cos(time))\n.modulateRotate(src(o0).rotate(0, -0.52), 0.2).mult(shape(360), 0.8)\n.repeat(10,5).mult(shape(360).scale(()=>Math.sin(time)), 0.8).rotate(0, 0.2)\n.diff(src(o0).rotate(0, -0.2), 0.2)\n.out()",
    /* celeste_0 */ "\n // Puertas II\n// por Celeste Betancur\n// https://github.com/essteban\n\nosc(13,0,1)\n  .kaleid()\n  .mask(shape(4,0.3,1))\n  .modulateRotate(shape(4,0.1,1))\n  .modulateRotate(shape(4,0.1,0.9))\n  .modulateRotate(shape(4,0.1,0.8))\n  .scale(0.3)\n  .add(shape(4,0.2,1).color(0.3,1,1,0.5))\n  .rotate(()=>time)\n  .out()",
    /* celeste_1 */ "// Puertas III\n// por Celeste Betancur\n// https://github.com/essteban\n \nosc(40,0.2,1)\n  .modulateScale(osc(40,0,1).kaleid(8))\n  .repeat(2,4)\n  .modulate(o0,0.05)\n  .modulateKaleid(shape(4,0.1,1))\n  .out(o0)",
    /* celeste_2 */ "\n // Puertas\n// por Celeste Betancur\n// https://github.com/essteban\n\nosc(13,0,1)\n  .modulate(osc(21,0.25,0))\n  .modulateScale(osc(34))\n  .modulateKaleid(osc(55),0.1,1)\n  .out()",
    /* alexandre_0 */ "// \"the-wall\"\n// Alexandre Rangel\n// www.alexandrerangel.art.br/hydra.html\n\nspeed=.0222\nosc(48,-.1,0).thresh([.3,.7].fast(.75),0).color(0,0,1)\n\n.add(\n    osc(28,.1,0).thresh([.3,.7].fast(.75),0).rotate(3.14/4)\n    .color(1,0,0)\n    .modulateScale( osc(64,-.01,0).thresh([.3,.7].fast(.75),0) )\n)\n.diff(\n    osc(28,.1,0).thresh([.3,.7].fast(.5),0).rotate(3.14/2)\n    .color(1,0,1)\n    .modulateScale( osc(64,-.015,0).thresh([.3,.7].fast(.5),0) )\n)\n.modulateRotate( osc(54,-.005,0).thresh([.3,.7].fast(.25),0) )\n.modulateScale( osc(44,-.020,0).thresh([.3,.7].fast(.25),0) )\n.colorama( ()=>Math.sin(time/27)*.01222+9.89)\n.scale(2.122)\n\n.out()",
    /* alexandre_1 */ "\n // \"eye of the beholder\"\n// Alexandre Rangel\n// www.alexandrerangel.art.br/hydra.html\n\nnoise(6,.05)\n.mult( osc(9,0, ()=>Math.sin(time/1.5)+2 ) )\n.mult(\n    noise(9,.03).brightness(1.2).contrast(2)\n    .mult( osc(9,0, ()=>Math.sin(time/3)+13 ) )\n)\n.diff(\n    noise(15,.04).brightness(.2).contrast(1.3)\n    .mult( osc(9,0, ()=>Math.sin(time/5)+13 ) )\n    .rotate( ()=>time/33 )\n)\n.scale( ()=>Math.sin(time/6.2)*.12+.15 )\n.modulateScale(\n    osc(3,0,0).mult( osc(3,0,0).rotate(3.14/2) )\n    .rotate( ()=>time/25 ).scale(.39).scale(1,.6,1).invert()\n    , ()=>Math.sin(time/5.3)*1.5+3  )\n.rotate( ()=>time/22 )\n.mult( shape(100,.9,.01).scale(1,.6,1) )\n.out()",
    /* alexandre_2 */ "// \"egg of the phoenix\"\n// Alexandre Rangel\n// www.alexandrerangel.art.br/hydra.html\n\nspeed=1.2\nshape(99,.15,.5).color(0,1,2)\n\n.diff( shape(240,.5,0).scrollX(.05).rotate( ()=>time/10 ).color(1,0,.75) )\n.diff( shape(99,.4,.002).scrollX(.10).rotate( ()=>time/20 ).color(1,0,.75) )\n.diff( shape(99,.3,.002).scrollX(.15).rotate( ()=>time/30 ).color(1,0,.75) )\n.diff( shape(99,.2,.002).scrollX(.20).rotate( ()=>time/40 ).color(1,0,.75) )\n.diff( shape(99,.1,.002).scrollX(.25).rotate( ()=>time/50 ).color(1,0,.75) )\n\n.modulateScale(\n  shape(240,.5,0).scrollX(.05).rotate( ()=>time/10 )\n  , ()=>(Math.sin(time/3)*.2)+.2 )\n\n.scale(1.6,.6,1)\n.out()",
    /* afalfl_0 */ "//filet mignon\n// AFALFL\n// instagram/a_f_alfl \n\nosc(100,-0.0018,0.17).diff(osc(20,0.00008).rotate(Math.PI/0.00003))\n.modulateScale(noise(1.5,0.18).modulateScale(osc(13).rotate(()=>Math.sin(time/22))),3)\n.color(11,0.5,0.4, 0.9, 0.2, 0.011, 5, 22,  0.5, -1).contrast(1.4)\n.add(src(o0).modulate(o0,.04),.6, .9)\n  //.pixelate(0.4, 0.2, 0.1)\n.invert().brightness(0.0003, 2).contrast( 0.5, 2, 0.1, 2).color(4, -2, 0.1)\n.modulateScale(osc(2),-0.2, 2, 1, 0.3)\n .posterize(200) .rotate(1, 0.2, 0.01, 0.001)\n .color(22, -2, 0.5, 0.5, 0.0001,  0.1, 0.2, 8).contrast(0.18, 0.3, 0.1, 0.2, 0.03, 1) . brightness(0.0001, -1, 10)\n  .out()",
    /* eerie_ear_0 */ "// ee_2 . MULTIVERSE . time and feedback\n// e_e // @eerie_ear\npat = ()=>\nsolid()\n.layer(solid().diff(\n  osc((time/16) * 1, (time/1000) * 0.2  )\n    .mult(osc((time/8) * 1, (time/1006) * 0.2  ).rotate(1.57))\n    .modulate((shape(106,1,0.05)))\n    .mult(shape(106,1,0.05))\n  ))\n  .modulateScale(osc(2,0.125),0.125)\n//\nsolid()\n.layer(solid(1,1,1)\n  .mult(pat()\n  .diff(src(o0).scale(0.2).mult(solid(),[0.7,0.6,0.4,0.6]).kaleid(1.01).saturate(0.3))\n)\n.layer(solid(1,1,1)\n    .mask(\n      noise(2,0.05)\n      .invert().colorama(2).posterize(8,4).luma(0.25).thresh(0.5)\n      .modulateRotate(osc(1,0.5))\n    )\n    .mult(gradient(0.5).kaleid(1).colorama(2).saturate(1.1).contrast(1.6).mult(solid(),0.45))\n  ))\n  .out()\n//\nspeed= 0.5",
    /* eerie_ear_1 */ "// ee_3 //LINES\n// e_e // @eerie_ear\n//\n//based on\n//@naoto_hieda\n//https://naotohieda.com/blog/hydra-book/\n//\nn = 8\na = () => shape(4,0.25,0.009).rotate(()=>time/-40).repeat(n,n)\na().add(a().scrollX(0.5/n).scrollY(0.5/n),1).modulate(o1,0.1).modulate(src(o1).color(10,10).add(solid(-14,-14)).rotate(()=>time/40),0.005).add(src(o1).scrollY(0.012,0.02),0.5).out(o1)\nsrc(o1).colorama(1.2).posterize(4).saturate(0.7).contrast(6).mult(solid(),0.15).out(o0)",
    /* eerie_ear_2 */ "//ee_5 . FUGITIVE GEOMETRY VHS . audioreactive shapes and gradients\n// e_e // @eerie_ear\n//\ns= ()=>\n  shape(4)\n.scrollX([-0.5,-0.2,0.3,-0.1,-0.1].smooth(0.1).fast(0.3))\n.scrollY([0.25,-0.2,0.3,-0.1,0.2].smooth(0.9).fast(0.15))\n//\nsolid()\n.add(gradient(3,0.05).rotate(0.05,-0.2).posterize(2).contrast(0.6),[1,0,1,0.5,0,0.6].smooth(0.9))\n.add(s())\n.mult(s().scale(0.8).scrollX(0.01).scrollY(-0.01).rotate(0.2,0.06).add(gradient(3).contrast(0.6),[1,0,1,0.5].smooth(0.9),0.5).mult(src(o0).scale(0.98),()=>a.fft[0]*9)\n     )\n.diff(s().modulate(shape(500)).scale([1.7,1.2].smooth(0.9).fast(0.05)))\n.add(gradient(2).invert(),()=>a.fft[2])\n.mult(gradient(()=>a.fft[3]*8))\n.blend(src((o0),()=>a.fft[1]*40))\n.add(voronoi(()=>a.fft[1],()=>a.fft[3],()=>a.fft[0]).thresh(0.7).posterize(2,4).luma(0.9).scrollY(1,()=>a.fft[0]/30).colorama(3).thresh(()=>a.fft[1]).scale(()=>a.fft[3]*2),()=>a.fft[0]/2)\n  .out()\n//\nspeed= 1\n\na.setSmooth(0.96)",
    /* eerie_ear_3 */ "// ee_1 . EYE IN THE SKY\n//example of mask and function modulation\n// e_e // @eerie_ear\nnoise(18)\n  .colorama(1)\n  .posterize(2)\n  .kaleid(50)\n  .mask(\n    shape(25, 0.25).modulateScale(\n      noise(400.5, 0.5)\n    )\n  )\n  .mask(shape(400, 1, 2.125))\n  .modulateScale(osc(6, 0.125, 0.05).kaleid(50))\n  .mult(osc(20, 0.05, 2.4).kaleid(50), 0.25)\n  .scale(1.75, 0.65, 0.5)\n  .modulate(noise(0.5))\n  .saturate(6)\n  .posterize(4, 0.2)\n  .scale(1.5)\n  .out();",
  ],

  /* 5) Default / fallback warm-up patterns. The live list shown on the hub
   *    comes from data.json (organiser-editable); this seeds it.            */
  STRUDEL_PATTERNS: [
    { title: "First beat", code: '// drums - Ctrl+Enter to play, Ctrl+. to stop\nsound("bd hh sd hh")' },
    { title: "Wobble bass", code: '// a wobbly bassline\nnote("c2 eb2 g2 bb2").sound("sawtooth").lpf(sine.range(300,1200).slow(4))' },
    { title: "Chords + arp", code: '// chords + a little arpeggio\nstack(\n  n("0 2 4").scale("C:minor").sound("piano").slow(2).room(.4),\n  n("0 2 4 6 7 6 4 2").scale("C:minor").sound("triangle").delay(.3)\n)' },
    { title: "Full groove", code: '// a whole little track - change any number and re-run\nsetcpm(120/4)\nstack(\n  sound("bd*2 ~ sd ~").bank("RolandTR909"),\n  sound("hh*8").gain(saw.range(.3,.8).fast(2)),\n  note("c2 ~ c2 g1").sound("sawtooth").lpf(700),\n  n("0 2 4 6").scale("C:minor").sound("piano").room(.5).gain(.6)\n)' },
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

/* The Flok session URL (with panes + starter code) for a session name.
 * `roomIndex` picks which Hydra sketch fills the visuals pane (each room a
 * different one). `username`, if given, is the presence name we join with
 * (used by the organiser "Oversee jams" view so it isn't counted as a seat). */
window.WORKSHOP.flokLink = function (sessionName, roomIndex, username) {
  var W = window.WORKSHOP;
  var idx = roomIndex || 0;
  var sketches = W.HYDRA_SKETCHES || [];
  var sketch = sketches.length ? sketches[((idx % sketches.length) + sketches.length) % sketches.length] : null;
  var targets = W.PANES.map(function (p) { return p.target; }).join(",");
  var hash = "#targets=" + targets;
  W.PANES.forEach(function (p, i) {
    var code = (p.target === "hydra" && sketch) ? sketch : p.code;
    hash += "&c" + i + "=" + W.enc(code);
  });
  if (username) hash += "&username=" + encodeURIComponent(username);
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
