// Import our requirements
const sequelize = require('sequelize');
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
                });

                const hbData = {
                    parent: topic.parentTopicID,
                    header: topic.topicName,
                    videos,
                    articles,
                    children,
                };
                let [mainArticle, ...altArticles] = articles;
                res.render('index', {
                    mainArticle,
                    altArticles,
                    // Parent will be used for parent button. Children will be used for children buttons.
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

    // Home page information
    app.get('/', async (req, res) => {
        const hbData = {
            header: 'Home Page',
        };
        res.render('home', hbData);
    });
};
