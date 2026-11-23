import puppeteer from 'puppeteer-core';
const [,, fichier, ...largeurs] = process.argv;
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
for (const w of largeurs) {
  const p = await b.newPage(); await p.setViewport({ width: +w, height: 900, deviceScaleFactor: 2 });
  await p.goto('file://' + process.cwd() + '/' + fichier); await p.evaluate(() => document.fonts.ready); await new Promise(r => setTimeout(r, 300));
  await p.screenshot({ path: `capture_${w}.png`, fullPage: true });
}
await b.close();
