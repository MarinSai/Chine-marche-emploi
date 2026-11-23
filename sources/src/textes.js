// Textes du graphique en trois langues. La langue est choisie à la compilation (VITE_LANGUE = fr, es ou it).
// Noms de métiers des infobulles : français pour toutes les langues pour l'instant (champ 0 de data.json), anglais en champ 1.
export const LANGUES = {
  fr: {
    titre: 'En Chine, les offres d’emploi reculent davantage dans les métiers exposés à l’IA',
    chapo: 'Variation du nombre d’offres d’emploi en ligne par métier entre juillet 2021-juin 2022 et juillet 2024-juin 2025, selon l’exposition du métier à l’IA',
    cle: ['Métiers moins exposés à l’IA', 'Métiers plus exposés à l’IA', 'Taille : nombre d’offres en 2021-2022'],
    axeY: 'Variation du nombre d’offres',
    moins: 'Moins exposés à l’IA', plus: 'Plus exposés à l’IA', mediane: 'Médiane',
    moyMoins: ['Moins exposés :', 'en moyenne'], moyPlus: ['Plus exposés :', 'en moyenne'],
    expo: 'Exposition à l’IA', offres: 'Offres', part: 'Part des offres 2021-2022',
    note: 'Métiers comptant au moins 500 offres en 2021-2022 (393), hors agents d’entretien (+52 %). Moyennes pondérées par le nombre d’offres, sur l’ensemble des 998 métiers de l’analyse. Exposition : indice de l’université de Pékin ; métiers classés de part et d’autre de la médiane.',
    source: 'Source : analyse Bloomberg d’offres d’emploi collectées par Revelio Labs (Zhaopin, 51job, Liepin), université de Pékin · Graphique : Le Grand Continent',
    desc: 'Nuage de points : chaque cercle est un métier ; plus il est exposé à l’IA, plus le nombre d’offres d’emploi a reculé entre 2021-2022 et 2024-2025.',
    etiquettes: { 'Software developers': 'Développeurs|de logiciels', 'Accountants': 'Comptables', 'Web developers': 'Développeurs web', 'Real estate agents': 'Agents immobiliers', 'Sales Managers': 'Directeurs commerciaux', 'Pharmacists': 'Pharmaciens', 'Chefs': 'Chefs cuisiniers', 'Molding & casting operators': 'Mouleurs et fondeurs', 'Mechanical engineers': 'Ingénieurs mécaniciens' },
    decimale: ',', dp: '\u00a0: ', pct: (s) => s + ' %'
  },
  es: {
    titre: 'En China, las ofertas de empleo caen más en los oficios expuestos a la IA',
    chapo: 'Variación del número de ofertas de empleo en línea por oficio entre julio de 2021-junio de 2022 y julio de 2024-junio de 2025, según la exposición del oficio a la IA',
    cle: ['Oficios menos expuestos a la IA', 'Oficios más expuestos a la IA', 'Tamaño: número de ofertas en 2021-2022'],
    axeY: 'Variación del número de ofertas',
    moins: 'Menos expuestos a la IA', plus: 'Más expuestos a la IA', mediane: 'Mediana',
    moyMoins: ['Menos expuestos:', 'de media'], moyPlus: ['Más expuestos:', 'de media'],
    expo: 'Exposición a la IA', offres: 'Ofertas', part: 'Peso en las ofertas 2021-2022',
    note: 'Oficios con al menos 500 ofertas en 2021-2022 (393), sin el personal de limpieza (+52 %). Medias ponderadas por el número de ofertas, sobre los 998 oficios del análisis. Exposición: índice de la Universidad de Pekín; oficios clasificados a ambos lados de la mediana.',
    source: 'Fuente: análisis de Bloomberg de ofertas de empleo recopiladas por Revelio Labs (Zhaopin, 51job, Liepin), Universidad de Pekín · Gráfico: El Grand Continent',
    desc: 'Diagrama de dispersión: cada círculo es un oficio; cuanto más expuesto a la IA, más ha caído el número de ofertas entre 2021-2022 y 2024-2025.',
    etiquettes: { 'Software developers': 'Desarrolladores|de software', 'Accountants': 'Contables', 'Web developers': 'Desarrolladores web', 'Real estate agents': 'Agentes inmobiliarios', 'Sales Managers': 'Directores comerciales', 'Pharmacists': 'Farmacéuticos', 'Chefs': 'Jefes de cocina', 'Molding & casting operators': 'Moldeadores y fundidores', 'Mechanical engineers': 'Ingenieros mecánicos' },
    decimale: ',', dp: ': ', pct: (s) => s + ' %'
  },
  it: {
    titre: 'In Cina le offerte di lavoro calano di più nei mestieri esposti all’IA',
    chapo: 'Variazione del numero di offerte di lavoro online per mestiere tra luglio 2021-giugno 2022 e luglio 2024-giugno 2025, secondo l’esposizione del mestiere all’IA',
    cle: ['Mestieri meno esposti all’IA', 'Mestieri più esposti all’IA', 'Dimensione: numero di offerte nel 2021-2022'],
    axeY: 'Variazione del numero di offerte',
    moins: 'Meno esposti all’IA', plus: 'Più esposti all’IA', mediane: 'Mediana',
    moyMoins: ['Meno esposti:', 'in media'], moyPlus: ['Più esposti:', 'in media'],
    expo: 'Esposizione all’IA', offres: 'Offerte', part: 'Quota delle offerte 2021-2022',
    note: 'Mestieri con almeno 500 offerte nel 2021-2022 (393), esclusi gli addetti alle pulizie (+52%). Medie ponderate per il numero di offerte, sull’insieme dei 998 mestieri dell’analisi. Esposizione: indice dell’Università di Pechino; mestieri classificati rispetto alla mediana.',
    source: 'Fonte: analisi Bloomberg di offerte di lavoro raccolte da Revelio Labs (Zhaopin, 51job, Liepin), Università di Pechino · Grafico: Il Grand Continent',
    desc: 'Grafico a dispersione: ogni cerchio è un mestiere; più è esposto all’IA, più il numero di offerte è calato tra il 2021-2022 e il 2024-2025.',
    etiquettes: { 'Software developers': 'Sviluppatori|software', 'Accountants': 'Contabili', 'Web developers': 'Sviluppatori web', 'Real estate agents': 'Agenti immobiliari', 'Sales Managers': 'Direttori commerciali', 'Pharmacists': 'Farmacisti', 'Chefs': 'Chef', 'Molding & casting operators': 'Formatori e fonditori', 'Mechanical engineers': 'Ingegneri meccanici' },
    decimale: ',', dp: ': ', pct: (s) => s + '%'
  }
};
export const LANGUE = (import.meta.env.VITE_LANGUE || 'fr');
export const T = LANGUES[LANGUE];
const signe = (v) => (v > 0 ? '+' : v < 0 ? '−' : '');
export const pct = (v, d = 0) => T.pct(signe(v) + Math.abs(v).toFixed(d).replace('.', T.decimale));
export const dec = (v, d = 2) => v.toFixed(d).replace('.', T.decimale);
