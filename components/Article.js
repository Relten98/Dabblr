// Object that represents an article. 
const puppeteer = require("puppeteer");

// Each article gets its own page. All articles (will likely) share a browser for parallel programming purposes.
class Article {
    constructor(href, score, browser, page) {
        this.href = href;
        this.score = score;
        this.browser = browser;
        this.page = page;
    }

    // (hopefully) gets just the website name, without the extra paths. Includes .com, .org, etc. 
    getSource() {
        let re = '//([A-Za-z.]*)/';
        const found = this.href.match(re)[1];
        return found;
    }

    getHeader() {
        return new Promise(async resolve => {
            // page.$ returns an ElementHandle - represents an in-page DOM element.
            let headerElem = await this.page.$('h1');
            // Grabs text content of first h1 on website.
            let header = await this.page.evaluate(el => el.textContent, headerElem);
            resolve(header);
        });
    }

    getSummary(long) {
        return new Promise(async resolve => {
            let paragraphElem = await this.page.$('p');
            let paragraph = await this.page.evaluate(el => el.textContent, paragraphElem)
            // since .slice returns a shallow copy.
            const sentences = paragraph.split(".");
            let total = sentences.length <= 6 ? sentences.length : 6;
            let summary = "";
            if (long) {
                for (let i = 0; i < total; i++) summary += sentences[i] + ".";
                resolve(summary)
            }
            else {
                for (let i = 0; i < Math.floor(total / 2); i++) summary += sentences[i] + ".";
                resolve(summary)
            }
        });
    }

    async getInfo(long) {
        await this.page.goto(this.href);
        return Promise.all([this.getHeader(), this.getSummary(long)]);
    }

    toHandleBars(long) {
        return new Promise(async resolve => {
            let hbObject = {
                header: "",
                summary: "",
                score: this.score,
                href: this.href,
                source: this.getSource()
            };
            [hbObject.header, hbObject.summary] = await this.getInfo(long);
            resolve(hbObject);
        });
    }
}

async function main() {
    let testDB = [
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
    ];
    console.time("stuff")
    const browser = await puppeteer.launch();

    const page1 = await browser.newPage();

    for (site of testDB) {
        await page1.goto(site.href);
    }
    console.timeEnd("stuff")
    // console.log("summary:", summary);
    browser.close();
}

// main();

module.exports = Article;

