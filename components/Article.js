// Object that represents an article. 
const Puppeteer = require("puppeteer");

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
            let total;
            let summary = "";
            sentences.length <= 6 ? total = sentences.length : total = 6;
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
}

async function main() {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    let wiki = new Article("https://en.wikipedia.org/wiki/Footwear", 32, browser, page);
    wiki.getSource();
    browser.close();
}

module.exports = Article;

