// Import our requirements
const sequelize = require('sequelize');
const puppeteer = require('puppeteer');
const db = require('../models');

const Article = require('../components/Article');

module.exports = (app) => {
    app.get('/topics/:topic', async (req, res) => {
        const topicID = req.params.topic;
        const parentTopicID = 1;
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
        const getParent = db.topic.getParent(parentTopicID);

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
                    return res.status(400).send('Topic does not exist')
                };
                // Refactor tutorials into videos and articles
                const videos = [];
                const articles = [];
                tutorials.forEach((element) => {
                    if (element.tutorialType === 'video') {
                        videos.push(element);
                    } else {
                        articles.push(element);
                    }
                    // console.log('dbData', dbData);
                });

                const hbData = {
                    parent: topic.parentTopicID,
                    header: topic.topicName,
                    videos,
                    articles,
                    children,
                };

                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                let mainArticle;
                let altArticles = [];
                for (let i = 0; i < articles.length; i++) {
                    // Create an Article object from data recieved from db. Article object is used for Puppeteer work.
                    let article = new Article(articles[i].tutorialLink, articles[i].votesSum, browser, page);
                    if (i === 0) {
                        mainArticle = await article.toHandleBars(articles[i].tutorialType, articles[i].tutorialName,
                            articles[i].fk_topicID, articles[i].fk_userID, true);
                    }
                    else {
                        let altArticle = await article.toHandleBars(articles[i].tutorialType, articles[i].tutorialName,
                            articles[i].fk_topicID, articles[i].fk_userID, true);
                        altArticles.push(altArticle);
                    }
                }

                res.render('index', {
                    mainArticle,
                    altArticles,
                    // parent will be used for parent button. Children will be used for children buttons.
                    parent,
                    children
                });
            });
        } catch (error) {
            res.status(500).send(
                'There was a problem retrieving from the database'
            );
        }
    });

    // Home page.
    app.get('/', async (req, res) => {
        const hbData = {
            // topics: topics,
            header: 'Home Page',
        };
        res.render('home', hbData);
    });
};
