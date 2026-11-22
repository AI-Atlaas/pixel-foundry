/** Pixel Foundry theme engine. No React, safe to import on the server or in build scripts. */
export type Settings = { preset: string; dark: boolean; pixel: number; shadow: number; density: string; grid: boolean; accent: string; pixelCursor: boolean; clickSparks: boolean };
export const defaults: Settings = { preset: 'night-garden', dark: true, pixel: 2, shadow: 4, density: 'comfortable', grid: true, accent: '', pixelCursor: true, clickSparks: true };
export const presets = [
  { id: 'night-garden', name: 'Night Garden', note: 'Mint pixels after midnight', colors: ['#150525','#342242','#2cd47d','#c9b8dc'], light: ['#effbf4','#f9fffc','#150525','#62516d','#dcefe4','#187346','#ffffff','#cbf2dd'], dark: ['#150525','#211032','#effbf4','#b6a8c6','#342242','#2cd47d','#150525','#264137'] },
  { id: 'parchment', name: 'Parchment', note: 'Warm & wonderfully analog', colors: ['#f5f2e9','#e5decc','#ce4224','#292820'], light: ['#f5f2e9','#fffdf6','#292820','#746e60','#eae5d9','#ce4224','#ffffff','#f8e5dc'], dark: ['#22211d','#2d2b25','#f4efdf','#b9b29f','#3b382e','#ff9879','#281c16','#50372c'] },
  { id: 'pocket', name: 'Pocket', note: 'A little handheld nostalgia', colors: ['#eef1d8','#b7c994','#3d622e','#253421'], light: ['#eef1d8','#f8fae9','#253421','#5e6d50','#dce5c5','#3d622e','#ffffff','#d3e4bc'], dark: ['#19251c','#233328','#e4efd6','#a9be9e','#324935','#b4d88b','#182517','#3a5131'] },
  { id: 'arcade', name: 'Arcade', note: 'Insert a little imagination', colors: ['#f2edfa','#dfd2f0','#7543c0','#302041'], light: ['#f2edfa','#fffbff','#302041','#705f7e','#e7def0','#7543c0','#ffffff','#e7d9fa'], dark: ['#21192d','#2c223b','#f1e8ff','#baabce','#40324e','#c6a0ff','#281737','#4c3567'] },
  { id: 'ocean', name: 'Ocean', note: 'Fresh from the save point', colors: ['#eaf2f3','#c7dfe2','#206979','#21363c'], light: ['#eaf2f3','#f9fdfd','#21363c','#536a70','#dce8ea','#206979','#ffffff','#d4e8ec'], dark: ['#17272e','#20343c','#e6f5f5','#a0bcc5','#304a53','#8bd4df','#162e33','#31515b'] },
];
export function foregroundFor(hex: string) {
  const rgb = hex.match(/[0-9a-f]{2}/gi)?.map(x => parseInt(x,16)/255) ?? [1,1,1];
  const linear = rgb.map(c => c <= .04045 ? c/12.92 : ((c+.055)/1.055)**2.4);
  const l = .2126*linear[0]+.7152*linear[1]+.0722*linear[2];
  return (l+.05)/.05 > 1.05/(l+.05) ? '#000000' : '#ffffff';
}
export function tokens(s: Settings): Record<string,string> {
  const p = presets.find(p => p.id === s.preset) ?? presets[0];
  const [bg,card,fg,muted,secondary,primary,primaryFg,accent] = s.dark ? p.dark : p.light;
  return { '--background':bg, '--foreground':fg, '--card':card, '--card-foreground':fg, '--popover':card, '--popover-foreground':fg, '--primary':s.accent || primary, '--primary-foreground':s.accent ? foregroundFor(s.accent) : primaryFg, '--secondary':secondary, '--secondary-foreground':fg, '--muted':secondary, '--muted-foreground':muted, '--accent':accent, '--accent-foreground':fg, '--border':fg, '--input':muted, '--ring':fg, '--destructive':s.dark?'#ff9f99':'#ad2c25', '--destructive-foreground':s.dark?'#311b1a':'#ffffff', '--success':s.dark?'#b7d89a':'#3b6534', '--warning':s.dark?'#efd28b':'#805c13', '--radius':'0px', '--pixel':s.pixel+'px', '--pixel-shadow':s.shadow+'px', '--control-height':s.density==='compact'?'34px':'42px', '--font-pixel':'"Pixelify Sans", monospace', '--font-body':'"IBM Plex Mono", monospace', '--shadow-color':s.dark?'#10100f':fg, '--desktop-font-size':'16px', '--mobile-font-size':'14px', ...cursorTokens(s.pixelCursor,s.accent||primary,fg) };
}
export function exportCSS(s:Settings) { return `/* Pixel Foundry · ${s.preset} · ${s.dark?'dark':'light'}\n * Semantic tokens compatible with shadcn/ui.\n * Add pixel-foundry.css and the React recipes for pixel geometry. */\n:root {\n${Object.entries(tokens(s)).map(([k,v])=>`  ${k}: ${v};`).join('\n')}\n  color-scheme: ${s.dark?'dark':'light'};\n}\n`; }

/** On-screen size of the pixel cursors in CSS pixels. The art is a 16×16 grid. */
const CURSOR_SIZE = 24;

function cursorTokens(enabled:boolean,fill:string,ink:string):Record<string,string> {
 const shapes:Record<string,string>={arrow:'M1 1h2v2h2v2h2v2h2v2h2v2H7v4H5v-4H3v2H1z',pointer:'M6 1h3v5h2V5h2v2h2v6h-2v2H6v-2H4v-2H2V8h3v2h1z',text:'M4 1h8v2H9v10h3v2H4v-2h3V3H4z',grab:'M3 4h2V2h2v2h2V2h2v2h2v2h2v6h-2v3H5v-2H3V9H1V6h2z',blocked:'M2 2h12v12H2z M4 4v8h8V4z M4 5h2v2h2v2h2v2h2'};
 // Click point of each cursor on the 16×16 grid: arrow tip, fingertip, I-beam center.
 const hotspots:Record<string,[number,number]>={arrow:[1,1],pointer:[7,1],text:[8,8],grab:[1,1],blocked:[1,1]};
 const fallbacks:Record<string,string>={arrow:'auto',pointer:'pointer',text:'text',grab:'grab',blocked:'not-allowed'};
 const scale=CURSOR_SIZE/16;
 return Object.fromEntries(Object.entries(shapes).map(([name,path])=>{
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${CURSOR_SIZE}" height="${CURSOR_SIZE}" viewBox="0 0 16 16" shape-rendering="crispEdges"><path d="${path}" fill="${fill}" fill-rule="evenodd" stroke="${ink}" stroke-width="1" stroke-linejoin="miter"/></svg>`;
 const hotspot=hotspots[name].map((v)=>Math.round(v*scale)).join(' ');
 return [`--cursor-${name}`,enabled?`url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hotspot}, ${fallbacks[name]}`:fallbacks[name]];
 }));
}

export type PresetId = typeof presets[number]['id'];

/** Writes the theme tokens as CSS variables on an element (default: <html>). Browser only. */
export function applyTheme(settings: Partial<Settings> = {}, el: HTMLElement = document.documentElement) {
  const s = { ...defaults, ...settings };
  for (const [k, v] of Object.entries(tokens(s))) el.style.setProperty(k, v);
  el.style.colorScheme = s.dark ? 'dark' : 'light';
  el.classList.toggle('dark', s.dark);
}

/** Static stylesheet for one preset: light tokens on :root, dark tokens on .dark / [data-theme="dark"]. */
export function presetCSS(preset: string, settings: Partial<Settings> = {}) {
  const block = (dark: boolean) =>
    Object.entries(tokens({ ...defaults, ...settings, preset, dark })).map(([k, v]) => `  ${k}: ${v};`).join('\n');
  return `/* Pixel Foundry theme · ${preset} */\n:root {\n${block(false)}\n  color-scheme: light;\n}\n.dark, [data-theme="dark"] {\n${block(true)}\n  color-scheme: dark;\n}\n`;
}
