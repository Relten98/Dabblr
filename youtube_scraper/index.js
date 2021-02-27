const puppeteer = require('puppeteer');
const youtube = require('./youtube');

try {
    (async () => {

        let keywords = [
            'history of footwear',
            'the evolution of footwear'
        ];

        const browser = await puppeteer.launch();
        let results = await youtube.scrape_youtube(browser, keywords);
        // let link = await youtube.scrape_youtube(browser,keywords)
        console.dir(results, { depth: null, colors: true });
        let history = `https://youtube.com${results[''].results[0].link}`;
        console.log(history)
        let evolution = `https://youtube.com${results['the evolution of footwear'].results[0].link}`
        console.log(evolution)
        let historyTwo = `https://youtube.com${results['history of footwear'].results[1].link}`
        console.log(historyTwo)
        await browser.close();

    })()
} catch (err) {
    console.error(err)
}