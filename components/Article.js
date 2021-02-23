// Object that represents an article. 
const puppeteer = require('puppeteer');
class Article {
    constructor(href, score) {
        this.href = href;
        this.score = score;
    }

    getHeader() {
        return new Promise(async resolve => {
            // page.$ returns an ElementHandle - represents an in-page DOM element.
            let headerElem = await page.$('h1');

            // Grabs text content of first h1 on website.
            let header = await page.evaluate(el => el.textContent, headerElem);
            resolve({
                header: header,
                summary: summary
            });
        });
    }

    getSummary(long) {
        return new Promise(async resolve => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(this.href);
            // TODO - Set min/max number of sentences. (split by '.') 
            let paragraphElem = await page.$('p');
            let paragraph = await page.evaluate(el => el.textContent, paragraphElem)
            browser.close();
            // since .slice returns a shallow copy.
            const sentences = paragraph.split(".");
            let total;
            let summary = "";
            sentences.length <= 6 ? total = sentences.length : total = 6;
            if (long) {
                for (let i = 0; i < total; i++) summary += sentences[i] + ".";
                resolve(summary)
            }
            else {
                for (let i = 0; i < Math.floor(total/2); i++) summary += sentences[i] + ".";
                resolve(summary)
            }
        });
    }
}

async function main() {
    let wiki = new Article("https://en.wikipedia.org/wiki/Footwear", 32);
    let summary = await wiki.getSummary(true);
    console.log(summary);
}

module.exports = Article;

