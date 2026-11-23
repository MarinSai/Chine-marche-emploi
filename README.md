# Offres d'emploi en Chine et exposition à l'IA

Nuage de points du Grand Continent : variation du nombre d'offres d'emploi en ligne par métier en Chine (juillet 2021-juin 2022 / juillet 2024-juin 2025) selon l'exposition du métier à l'IA.

- `index.html` (FR), `es.html` (ES), `it.html` (IT) : fichiers autonomes à intégrer en iframe (iframe-resizer).
- `sources/` : code Svelte 4 + Vite. Compilation : `cd sources && npm install && VITE_LANGUE=fr npx vite build` (fr, es ou it, sortie dans `dist-<langue>`).
- `sources/donnees/` : données par métier et CSV pour Datawrapper.

Source : analyse Bloomberg d'offres d'emploi collectées par Revelio Labs (Zhaopin, 51job, Liepin), indice d'exposition de l'université de Pékin.
