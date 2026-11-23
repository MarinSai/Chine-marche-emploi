import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage(); await p.setViewport({ width: 360, height: 900, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await p.goto('file://' + process.cwd() + '/dist-fr/index.html'); await p.evaluate(() => { document.documentElement.classList.add('embarque'); return document.fonts.ready; });
await new Promise(r=>setTimeout(r,300)); await p.screenshot({ path: 'emb.png', fullPage: true }); await b.close();
