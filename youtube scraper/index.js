const puppeteer = require('puppeteer');
const youtube = require('./youtube');

try {
    (async () => {

        let keywords = [
            'how to tie your shoes',
            'how to shave',
            'how to make fresh pasta'
        ];

        const browser = await puppeteer.launch();
        let results = await youtube.scrape_youtube(browser, keywords);
        console.dir(results, {depth: null, colors: true});

        await browser.close();

    })()
} catch (err) {
    console.error(err)
}