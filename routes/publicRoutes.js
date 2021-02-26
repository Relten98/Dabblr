// Import our requirements
const db = require('../models');
const puppeteer = require('puppeteer');

const Article = require('../components/Article');

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

let topicChildren = [
    {
        topicID: 1,
        name: "child topic 1"
    },
    {
        topicID: 2,
        name: "child topic 2"
    },
    {
        topicID: 3, 
        name: "child topic 3"
    }
];

module.exports = (app) => {
    app.get('/', async (req, res) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        let main;
        let altArticles = [];
        for (let i = 0; i < testDB.length; i++) {
            let article = new Article(testDB[i].href, testDB[i].score, browser, page);
            let [header, summary] = ["", ""];
            let source = article.getSource();
            if (i === 0) {
                main = await article.toHandleBars(true);
            }
            else {
                altArticles.push(await article.toHandleBars(false))
            }
        }

        res.render('index', {
            main: main,
            alts: altArticles,
            topicChildren: topicChildren
        });
    });


    // app.get('/', async (req, res) => {
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();

    //     // Mamamia papapia, we ain't gettin no wiki-ria
    //     // let wiki = new Article("https://en.wikipedia.org/wiki/Footwear", 32, browser, page);
    //     // let [header, summary] = await wiki.getInfo(true);

    //     db.topic.findOne({ where: { id: 1 } }).then((dbTopic) => {
    //         console.log("topic: ", dbTopic);

    //         let hbData = {
    //             href: wiki.href,
    //             header: dbTopic.topicName,
    //             score: "+9001",
    //             // score: wiki.score,
    //             summary: "the cake is a lie",
    //             // source: wiki.getSource()
    //         };

    //         // The information belowe will feed into the handlebar renderer

    //         // Handlebar renderer
    //         res.render('index', hbData);
    //     })
    // })
}
// haha code go boom