// Import our requirements
const puppeteer = require('puppeteer');
const db = require('../models');

// const Article = require('./components/Article');

module.exports = (app) => {
    app.get('/topics/:topic', async (req, res) => {
        const topicID = req.params.topic;
        const parentTopicID = req.params.topic;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        console.log('req.params.topic ', req.params.topic);
        // Mamamia papapia, we ain't gettin no wiki-ria
        // let wiki = new Article("https://en.wikipedia.org/wiki/Footwear", 32, browser, page);
        // let [header, summary] = await wiki.getInfo(true);

        // Model call functions
        const getTopic = db.topic.getTopic(topicID);
        const getTutorials = 'tutorial db call goes here';
        const getVotes = 'vote db call goes here';
        const getChildren = 'vote db call goes here';
        const getParent = db.topic.getParent(parentTopicID);

        Promise.all([
            getTopic,
            getTutorials,
            getVotes,
            getChildren,
            getParent,
        ]).then((dbData) => {
            const [topic, tutorials, votes, children, parent] = dbData;

            // GOD I HOPE THIS WORKS.
            const hbData = {
                // href: wiki.href, 
                parent: topic.parentTopicID,
                header: topic.topicName,
                score: '+9001',
                // score: wiki.score,
                summary: 'the cake is a lie',
                // source: wiki.getSource()
                child: topic.childTopicID,
            };
            // The information below will feed into the handlebar renderer

            // Me: A "civilized" human being.

            // Handlebar renderer:
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
