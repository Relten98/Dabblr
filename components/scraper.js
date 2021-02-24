const puppeteer = require('puppeteer');

class Scraper {
    constructor() {
        this.db = [
            {
                href: "https://en.wikipedia.org/wiki/Footwear",
                score: 32,
            },
            {
                href: "https://www.dolitashoes.com/blogs/news/the-history-and-evolution-of-shoes",
                score: 17,
            },
            {
                href: "https://allthatsinteresting.com/fascinating-history-footwear",
                score: -100,
            }
        ]
    }
}
function getArticleInfo(url) {
    return new Promise(async resolve => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // page.$ returns an ElementHandle - represents an in-page DOM element.
        let headerElem = await page.$('h1');
        let paragraphElem = await page.$('p');
        // Grabs text content of first paragraph on website.
        // TODO - Set min/max number of sentences. (split by '.') 
        let header = await page.evaluate(el => el.textContent, headerElem)
        let summary = await page.evaluate(el => el.textContent, paragraphElem)

        let imageElement = await page.$('img');
        await browser.close();
        resolve({
            header: header,
            summary: summary
        });
    });
}

async function main() {
    console.log(await getArticleInfo('https://en.wikipedia.org/wiki/Footwear'));
}

main();
