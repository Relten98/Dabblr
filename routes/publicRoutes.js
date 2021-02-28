// Import our requirements
const sequelize = require('sequelize');
<<<<<<< HEAD
const puppeteer = require('puppeteer');
=======
>>>>>>> 8f04ac8c847ce325ce175ba8163b02c7edb3685f
const db = require('../models');

const Article = require('../components/Article');

<<<<<<< HEAD
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
let videoDB = [
    {
        href: "https://youtube.com/watch?v=0EtsSdCPxV8",
        score: 1
    },
    {
        href: "https://youtube.com/watch?v=JLrL-MWGu80",
        score: 2

    },
    {
        href: "https://youtube.com//watch?v=vazVWZXnTX8",
        score: 3

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

=======
>>>>>>> 8f04ac8c847ce325ce175ba8163b02c7edb3685f
module.exports = (app) => {
    // Topics route
    app.get('/topics/:topic', async (req, res) => {
        const topicID = req.params.topic;
<<<<<<< HEAD
        const parentTopicID = req.params.topic;
        const browser = await puppeteer.launch();

        // We forgot what this did, what is this for?
        const page = await browser.newPage();

=======
        if (topicID === '1') {
            res.redirect('/');
            return;
        }
>>>>>>> 8f04ac8c847ce325ce175ba8163b02c7edb3685f
        // Model call functions
        const getTopic = db.topic.getTopic(topicID);
        // Note getTutorialsAndVotes is, here, instead of being a model method because it uses an "include" and we couldn't get that woking in a model folder.
        const getTutorialsAndVotes = new Promise((resolve, reject) => {
            const tutData = db.tutorial.findAll({
                where: { fk_topicID: topicID },
                attributes: {
                    include: [
                        [
                            sequelize.literal(`
                    (SELECT SUM(voteType)
                    FROM votes AS votes
                    WHERE votes.fk_tutorialID = tutorial.id
                    )`),
                            'votesSum',
                        ],
                    ],
                },
                order: [[sequelize.literal('votesSum'), 'DESC']],
                raw: true,
            });

            resolve(tutData);
        });
        // Parent and child model methods.
        // Each topic has parent and children.
        const getChild = db.topic.getChild(topicID);
        const getParent = db.topic.getParent(topicID);

        // Makes all database calls
        try {
            Promise.all([
                getTopic,
                getTutorialsAndVotes,
                getChild,
                getParent,
            ]).then(async (dbData) => {
                const [topic, tutorials, children, parent] = dbData;
                if (!dbData[0]) {
                    return res.status(400).send('Topic does not exist');
                }
                parent.topicName = parent['parent.topicName'];
                // Refactor tutorials into videos and articles
                const videos = [];
                const articles = [];
                tutorials.forEach((element) => {
                    if (element.tutorialType === 'video') {
                        videos.push(element);
                    } else {
                        articles.push(element);
                    }
                });
                let [mainArticle, ...altArticles] = articles;
                res.render('index', {
                    mainArticle,
                    altArticles,
                    // Parent will be used for parent button. Children will be used for children buttons.
                    parent,
                    header: topic.topicName,
                    children,
                });
            });
        } catch (error) {
            res.status(500).send(
                'There was a problem retrieving from the database'
            );
        }
    });

<<<<<<< HEAD
    app.get('/', (req, res) => {
        res.render('index')
    })
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
=======
    // Home page route
>>>>>>> 8f04ac8c847ce325ce175ba8163b02c7edb3685f
    app.get('/', async (req, res) => {
        db.topic.getChild(1).then((childData) => {
            const hbData = {
                children: childData,
            };
            res.render('home', hbData);
        });
    });
<<<<<<< HEAD
;
=======
};
>>>>>>> 8f04ac8c847ce325ce175ba8163b02c7edb3685f
