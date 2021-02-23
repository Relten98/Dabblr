const puppeteer = require('puppeteer');

let db = [
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

function getArticleInfo(url) {
    return new Promise(async resolve => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // page.$ returns an ElementHandle - represents an in-page DOM element.
        let element = await page.$('p');
        // Grabs text content of first paragraph on website.
        // TODO - Set min/max number of sentences. (split by '.') 
        let summary = await page.evaluate(el => el.textContent, element)

        let imageElement = await page.$('img');
        // TODO - Deal with http images.
        let imageSrc = 'https:' + await page.evaluate(el => el.getAttribute("src"), imageElement);
        await browser.close();
        resolve ({
            summary: summary,
            imageSrc: imageSrc
        });
    });
}

async function main() {
    console.log(await getArticleInfo('https://en.wikipedia.org/wiki/Footwear'));
}

main();
