// Import our requirements
const puppeteer = require('puppeteer');
const db = require('../models');

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
]

module.exports = (app) => {
    app.get('/topics/:topic', async (req, res) => {
        const topicID = req.params.topic;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
<<<<<<< HEAD
        console.log('req.params.topic ', req.params.topic);
        // Mamamia papapia, we ain't gettin no wiki-ria
        // let wiki = new Article("https://en.wikipedia.org/wiki/Footwear", 32, browser, page);
        // let [header, summary] = await wiki.getInfo(true);

        // Model call functions
        const getTopic = db.topic.getTopic(topicID);
        const getTutorials = 'tutorial db call goes here';
        const getVotes = 'vote db call goes here';
        const getChildren = 'children topic db call goes here';
        const getParent = 'parent topic db call goes here';

        Promise.all([
            getTopic,
            getTutorials,
            getVotes,
            getChildren,
            getParent,
        ]).then((dbData) => {
            const [topic, tutorials, votes, children, parent] = dbData;

            // console.log('topicName ', topicName)
            const hbData = {
                // href: wiki.href,
                header: topic.topicName,
                score: '+9001',
                // score: wiki.score,
                summary: 'the cake is a lie',
                // source: wiki.getSource()
            };
            // The information belowe will feed into the handlebar renderer
            // Handlebar renderer
            res.render('index', hbData);
        });
    });

    app.get('/', async (req, res) => {
        const hbData = {
            // href: wiki.href,
            header: 'Home Page',
            score: '+9001',
            // score: wiki.score,
            summary: 'the cake is a lie',
            // source: wiki.getSource()
        };
        res.render('index', hbData);
    });
};
=======

        let main;
        let altArticles = [];
        for (let i = 0; i < testDB.length; i++) {
            let article = new Article(testDB[i].href, testDB[i].source, browser, page);
            let [header, summary] = ["", ""];
            let source = article.getSource();
            if (i === 0) {
                [header, summary] = await article.getInfo(true);
                main = {
                    header: header,
                    summary: summary,
                    score: testDB[i].score,
                    href: testDB[i].href,
                    source: source
                };
            }
            else {
                [header, summary] = await article.getInfo(false);
                altArticles.push({
                    header: header,
                    summary: summary,
                    score: testDB[i].score,
                    href: testDB[i].href,
                    source: source
                });
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
>>>>>>> 2812f02959fc8a08ae4fbb6059ae9ef701bb4b88
