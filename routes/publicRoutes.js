// Import our requirements
const sequelize = require('sequelize');
const puppeteer = require('puppeteer');
const db = require('../models');

// const Article = require('./components/Article');

module.exports = (app) => {
    app.get('/topics/:topic', async (req, res) => {
        const topicID = req.params.topic;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // console.log('req.params.topic ', req.params.topic);
        // Mamamia papapia, we ain't gettin no wiki-ria
        // let wiki = new Article("https://en.wikipedia.org/wiki/Footwear", 32, browser, page);
        // let [header, summary] = await wiki.getInfo(true);

        // Model call functions
        const getTopic = db.topic.getTopic(topicID);
        // Note getTutorialsAndVotes is not a model method because it uses an "include" and we couldn't get that woking in a model folder.
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

        const getChildren = 'children topic db call goes here';
        const getParent = 'parent topic db call goes here';

        Promise.all([
            getTopic,
            getTutorialsAndVotes,
            getChildren,
            getParent,
        ]).then((dbData) => {
            const [topic, tutorials, children, parent] = dbData;
            console.log('dbData', dbData);

            // refactor tutorials into videos and articles
            const videos = [];
            const articles = [];
            // tutorials.forEach((element) => {
            //     if (element.tutorialType === 'video') {
            //         videos.push(element);
            //     } else {
            //         articles.push(element);
            //     }
            // });
            // console.log('videos', videos);
            // console.log('articles', articles);
            const hbData = {
                // href: wiki.href,
                header: topic.topicName,
                videos,
                articles,
                score: '+9001',
                // tutorials: t
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
