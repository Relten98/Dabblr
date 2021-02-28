const puppeteer = require('puppeteer');
const youtube = require('./youtube');

try {
    (async () => {

        let keywords = [
            'headphone reviews'
        ];

        const browser = await puppeteer.launch();
        let results = await youtube.scrape_youtube(browser, keywords);
        // let link = await youtube.scrape_youtube(browser,keywords)
        console.dir(results, { depth: null, colors: true });
        let history = `https://youtube.com${results['headphone reviews'].results[0].link}`;
        console.log(history)
        let evolution = `https://youtube.com${results['headphone reviews'].results[1].link}`
        console.log(evolution)
        let historyTwo = `https://youtube.com${results['headphone reviews'].results[2].link}`
        console.log(historyTwo)
        await browser.close();

    })()
} catch (err) {
    console.error(err)
}