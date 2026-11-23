<script>
  import { T, pct, dec, LANGUE } from './textes.js';
  import brut from './data.json';

  // [nom fr, nom en, exposition, variation %, part des offres 2021-22 %, plus exposé ?]
  const metiers = brut.map((d, i) => ({ i, fr: LANGUE === 'es' ? d[6] : LANGUE === 'it' ? d[7] : d[0], en: d[1], x: d[2], y: d[3], w: d[4], h: d[5] === 1 }))
    .sort((a, b) => b.w - a.w); // les gros cercles d'abord, les petits par-dessus

  const MEDIANE = 0.7025;            // entre le dernier métier « moins exposé » (0,701) et le premier « plus exposé » (0,704)
  const MOY = { moins: -46.3, plus: -58.0 }; // moyennes pondérées, 998 métiers (offres 2024-25 / 2021-22 − 1)
  const X0 = 0.15, X1 = 0.93, Y0 = -90, Y1 = 30;

  // Étiquettes : décalage du texte par rapport au centre du cercle (px), ancrage ; « m » = aussi sur téléphone
  const ETIQ = [
    { en: 'Software developers', pos: 'marge', dt: -10, posM: 'bas', m: true },
    { en: 'Accountants', pos: 'marge' },
    { en: 'Web developers', pos: 'b' },
    { en: 'Real estate agents', pos: 'b', posM: 'l', m: true },
    { en: 'Pharmacists', pos: 't' },
    { en: 'Chefs', pos: 't', m: true },
    { en: 'Molding & casting operators', pos: 'r' },
  ];
  function place(e) {
    const r = e.p.r, g = (tel && e.posM) || e.pos, n = T.etiquettes[e.en].split('|').length;
    if (g === 'l' || g === 'r') {
      const y = e.p.cy + 4 - (n - 1) * 7 + (e.dy || 0);
      return g === 'l' ? { x: e.p.cx - r - 5, y, a: 'end' } : { x: e.p.cx + r + 5, y, a: 'start' };
    }
    if (g === 'marge') {
      const dt = e.dt || 0, yt = e.p.cy + dt, xa = e.p.cx + Math.sqrt(Math.max(0, r * r - dt * dt)), xl = largeur - M.d + 8;
      return { x: xl, y: yt + 4 - (n - 1) * 7, a: 'start', trait: [xa, yt, xl - 4, yt] };
    }
    if (g === 'bas') {
      const y = sy(-85), xl = largeur - M.d;
      return { x: xl, y, a: 'end', trait: [e.p.cx + r * 0.7, e.p.cy + r * 0.7, xl - 30, y - 12] };
    }
    if (g === 'b') return { x: e.p.cx, y: e.p.cy + r + 13, a: 'middle' };
    if (g === 't') return { x: e.p.cx, y: e.p.cy - r - 5, a: 'middle' };
    return { x: e.p.cx, y: e.p.cy - r - 5 - (n - 1) * 14, a: 'middle' };
  }

  let largeur = 640;
  // Écran tactile sans survol (téléphone, tablette) : consigne « touchez »
  const tactile = typeof matchMedia !== 'undefined' && matchMedia('(hover: none)').matches;
  $: tel = largeur < 600;
  $: H = Math.round(tel ? largeur * 1.35 : largeur * 0.6);
  $: M = { g: tel ? 34 : 40, d: tel ? 10 : 92, h: 34, b: 30 };
  $: sx = (v) => M.g + (v - X0) / (X1 - X0) * (largeur - M.g - M.d);
  $: sy = (v) => M.h + (Y1 - v) / (Y1 - Y0) * (H - M.h - M.b);
  $: k = (tel ? 11 : 15);            // rayon (px) = k × √part
  $: rayon = (w) => Math.max(1.6, k * Math.sqrt(w));
  $: pts = metiers.map((m) => ({ ...m, cx: sx(m.x), cy: sy(m.y), r: rayon(m.w) }));
  $: etiq = ETIQ.filter((e) => !tel || e.m).map((e) => ({ ...e, p: pts.find((p) => p.en === e.en) })).filter((e) => e.p).map((e) => ({ ...e, ...place(e) }));
  const GRILLE = [25, 0, -25, -50, -75];
  const TICKS = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

  // Infobulle
  let survol = null, svgEl, posBulle = { x: 0, y: 0 };
  function proche(ev) {
    const b = svgEl.getBoundingClientRect();
    const mx = ev.clientX - b.left, my = ev.clientY - b.top;
    let best = null, dmin = Infinity;
    for (const p of pts) {
      const d = Math.hypot(p.cx - mx, p.cy - my) - p.r;
      if (d < dmin || (d === dmin && p.r < best.r)) { dmin = d; best = p; }
    }
    return dmin < (ev.pointerType === 'mouse' ? 10 : 16) ? best : null;
  }
  function montre(p) {
    survol = p;
    if (p) posBulle = { x: p.cx, y: p.cy - p.r };
  }
  // Souris : l'infobulle suit le survol. Tactile : un appui fixe l'infobulle,
  // un nouvel appui sur la même bulle ou à côté la ferme.
  function bouge(ev) { if (ev.pointerType === 'mouse') montre(proche(ev)); }
  function appui(ev) {
    if (ev.pointerType === 'mouse') return montre(proche(ev));
    const p = proche(ev);
    montre(p && (!survol || survol.i !== p.i) ? p : null);
  }
  function sort(ev) { if (ev.pointerType === 'mouse') survol = null; }
  function dehors(ev) { if (survol && ev.pointerType !== 'mouse' && svgEl && !svgEl.contains(ev.target)) survol = null; }
  // Garder l'infobulle sur la bonne bulle si la largeur change
  $: if (survol) { const p = pts.find((q) => q.i === survol.i); if (p && p !== survol) montre(p); }
</script>

<svelte:window on:pointerdown={dehors} />

<figure class="bloc">
  <h1>{T.titre}</h1>
  <p class="chapo">{T.chapo}</p>
  <p class="aide">{tactile ? T.aide[1] : T.aide[0]}</p>
  <ul class="cle">
    <li><svg width="14" height="14"><circle cx="7" cy="7" r="6" class="c-moins" /></svg>{T.cle[0]}</li>
    <li><svg width="14" height="14"><circle cx="7" cy="7" r="6" class="c-plus" /></svg>{T.cle[1]}</li>
    <li><svg width="22" height="14"><line x1="0" x2="22" y1="7" y2="7" class="moy moy-moins" /></svg>{T.moyCle[0]}{T.dp}<b>{pct(MOY.moins)}</b></li>
    <li><svg width="22" height="14"><line x1="0" x2="22" y1="7" y2="7" class="moy moy-plus" /></svg>{T.moyCle[1]}{T.dp}<b class="rouge">{pct(MOY.plus)}</b></li>
    <li><svg width="26" height="14"><circle cx="4" cy="10" r="3" class="c-vide" /><circle cx="17" cy="7" r="6.5" class="c-vide" /></svg>{T.cle[2]}</li>
  </ul>

  <div class="scene" bind:clientWidth={largeur}>
    <svg bind:this={svgEl} width={largeur} height={H} role="img" aria-label={T.desc}
      on:pointermove={bouge} on:pointerdown={appui} on:pointerleave={sort}>
      <!-- Axe vertical -->
      <text class="axe-titre" x={M.g - 30 < 0 ? 0 : 0} y={12}>{T.axeY}</text>
      {#each GRILLE as g}
        <line x1={M.g} x2={largeur - M.d} y1={sy(g)} y2={sy(g)} class={g === 0 ? 'zero' : 'grille'} />
        <text class="ytick" x={M.g - 6} y={sy(g) + 4}>{g === 0 ? '0' : pct(g)}</text>
      {/each}
      <!-- Axe horizontal -->
      {#each TICKS as t}
        <text class="xtick" x={sx(t)} y={H - M.b + 15}>{dec(t, 1)}</text>
      {/each}
      <text class="sens moins" x={M.g} y={H - 2}>← {T.moins}</text>
      <text class="sens plus" x={largeur - M.d} y={H - 2}>{T.plus} →</text>

      <!-- Médiane -->
      <line x1={sx(MEDIANE)} x2={sx(MEDIANE)} y1={M.h - 6} y2={H - M.b} class="mediane" />
      <text class="med-l" x={sx(MEDIANE)} y={M.h - 10}>{T.mediane}</text>

      <!-- Cercles -->
      <g class="nuage" class:estompe={survol}>
      {#each pts as p (p.i)}
        <circle cx={p.cx} cy={p.cy} r={p.r} class={p.h ? 'c-plus' : 'c-moins'} class:actif={survol && survol.i === p.i} />
      {/each}
      </g>

      <!-- Moyennes -->
      <line x1={M.g} x2={sx(MEDIANE)} y1={sy(MOY.moins)} y2={sy(MOY.moins)} class="moy moy-moins" />
      <line x1={sx(MEDIANE)} x2={largeur - M.d} y1={sy(MOY.plus)} y2={sy(MOY.plus)} class="moy moy-plus" />

      <!-- Étiquettes -->
      {#each etiq as e}
        <circle cx={e.p.cx} cy={e.p.cy} r={e.p.r} class="cerne" />
        {#if e.trait}<line x1={e.trait[0]} y1={e.trait[1]} x2={e.trait[2]} y2={e.trait[3]} class="trait" />{/if}
        <text class="etiq" x={e.x} y={e.y} text-anchor={e.a}>{#each (e.ligne1 ? [T.etiquettes[e.en].replace('|', ' ')] : T.etiquettes[e.en].split('|')) as l, j}<tspan x={e.x} dy={j ? 14 : 0}>{l}</tspan>{/each}</text>
      {/each}

      {#if survol}
        <circle cx={survol.cx} cy={survol.cy} r={survol.r + 1.5} class="survol" />
      {/if}
    </svg>

    {#if survol}
      <div class="bulle" style="left:{Math.min(Math.max(posBulle.x, 95), largeur - 95)}px; top:{posBulle.y}px">
        <strong>{survol.fr}</strong>
        <span>{T.offres}{T.dp}<b class:rouge={survol.h}>{pct(survol.y, 1)}</b></span>
        <span>{T.expo}{T.dp}{dec(survol.x)}</span>
        <span>{T.part}{T.dp}{pct(survol.w, survol.w < 0.1 ? 2 : 1).replace('+', '')}</span>
      </div>
    {/if}
  </div>

  <p class="note">{T.note}</p>
  <p class="source">{T.source}</p>
</figure>

<style>
  .bloc { padding: 14px var(--marge) 10px; max-width: 1100px; }
  h1 { font-family: var(--titre); font-weight: 700; font-size: clamp(21px, 3.2vw, 28px); line-height: 1.15; text-wrap: balance; margin-bottom: 6px; }
  .chapo { color: var(--gris); font-size: 15px; line-height: 1.4; margin-bottom: 10px; max-width: 760px; }
  .aide { font-size: 12.5px; color: var(--gris); font-style: italic; margin: -4px 0 10px; }
  .cle { list-style: none; display: flex; flex-wrap: wrap; gap: 4px 18px; font-size: 12.5px; color: var(--encre); margin-bottom: 8px; }
  .cle li { display: flex; align-items: center; gap: 6px; }
  .scene { position: relative; width: 100%; touch-action: pan-y; }
  svg { display: block; overflow: visible; font-family: var(--texte); }
  .c-moins { fill: #a9a9ae; fill-opacity: .9; stroke: #fff; stroke-width: 1.2; }
  .cle .c-moins, .cle .c-plus { stroke-width: 0; }
  .c-plus { fill: var(--rouge); fill-opacity: .82; stroke: #fff; stroke-width: 1.2; }
  .nuage circle { transition: opacity .15s; }
  .nuage.estompe circle { opacity: .28; }
  .nuage.estompe circle.actif { opacity: 1; }
  .c-vide { fill: none; stroke: #6e6e73; stroke-width: 1; }
  .grille { stroke: #ececec; stroke-width: 1; }
  .zero { stroke: var(--encre); stroke-width: 1; }
  .ytick { font-size: 11.5px; fill: var(--gris); text-anchor: end; font-variant-numeric: tabular-nums; }
  .xtick { font-size: 11px; fill: #9a9aa0; text-anchor: middle; }
  .axe-titre { font-size: 12px; fill: var(--gris); font-weight: 500; }
  .sens { font-size: 12.5px; font-weight: 600; }
  .sens.moins { fill: #6e6e73; }
  .sens.plus { fill: var(--rouge); text-anchor: end; }
  .mediane { stroke: var(--encre); stroke-width: 1; stroke-dasharray: 1.5 3; }
  .med-l { font-size: 11.5px; font-style: italic; fill: var(--gris); text-anchor: middle; }
  .moy { stroke-width: 1.6; stroke-dasharray: 6 4; }
  .moy-moins { stroke: #4a4a4f; }
  .moy-plus { stroke: #a3122a; }
  .moy-t { font-size: 12.5px; font-weight: 500; paint-order: stroke; stroke: #fff; stroke-width: 4px; stroke-linejoin: round; }
  .moy-t.moins { fill: #4a4a4f; }
  .moy-t.plus { fill: #a3122a; }
  .moy-t .fort { font-weight: 700; }
  .etiq { font-size: 12.5px; font-weight: 600; fill: var(--encre); paint-order: stroke; stroke: #fff; stroke-width: 3.5px; stroke-linejoin: round; pointer-events: none; }
  .etiq.dans { font-size: 11.5px; }
  .trait { stroke: var(--encre); stroke-width: .8; pointer-events: none; }
  .cle b { font-weight: 600; margin-left: 2px; }
  .cle b.rouge { color: #a3122a; }
  .cle .moy { stroke-dasharray: 5 3; }
  .cerne { fill: none; stroke: var(--encre); stroke-width: 1.2; pointer-events: none; }
  .survol { fill: none; stroke: var(--encre); stroke-width: 1.8; pointer-events: none; }
  .bulle { position: absolute; transform: translate(-50%, calc(-100% - 10px)); background: #fff; border: 1px solid var(--filet); box-shadow: 0 2px 8px rgba(0,0,0,.12); padding: 7px 10px; font-size: 12.5px; line-height: 1.4; pointer-events: none; display: flex; flex-direction: column; width: max-content; max-width: 210px; }
  .bulle strong { font-family: var(--titre); font-size: 14px; line-height: 1.2; margin-bottom: 3px; }
  .bulle span { color: var(--gris); }
  .bulle b { color: var(--encre); font-weight: 600; }
  .bulle b.rouge { color: var(--rouge); }
  .note { font-size: 11.5px; color: var(--gris); line-height: 1.4; margin-top: 10px; }
  .source { font-size: 12px; color: var(--gris); border-top: 1px solid var(--filet); padding-top: 7px; margin-top: 8px; }
</style>
