import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';
const L = process.env.VITE_LANGUE || 'fr';
const TITRES = {
  fr: 'En Chine, les offres d’emploi reculent davantage dans les métiers exposés à l’IA',
  es: 'En China, las ofertas de empleo caen más en los oficios expuestos a la IA',
  it: 'In Cina le offerte di lavoro calano di più nei mestieri esposti all’IA'
};
export default defineConfig({
  plugins: [svelte(), viteSingleFile(), { name: 'langue', transformIndexHtml: (h) => h.replace('%LANG%', L).replace('%TITRE%', TITRES[L]) }],
  build: { outDir: 'dist-' + L, target: 'es2019', cssCodeSplit: false, assetsInlineLimit: 100000000 }
});
