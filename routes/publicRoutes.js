// Import our requirements
const sequelize = require('sequelize');
const db = require('../models');

const Article = require('../components/Article');

module.exports = (app) => {
    // Topics route
    app.get('/topics/:topic', async (req, res) => {
        const topicID = req.params.topic;
        if (topicID === '1') {
            res.redirect('/');
            return;
        }
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
                let [mainVideo, ...altVideos] = videos;
                console.log("HAYYYYYY",mainVideo)
                let [mainArticle, ...altArticles] = articles;
                res.render('index', {
                    mainArticle,
                    altArticles,
                    mainVideo,
                    altVideos,
                    // Parent will be used for parent button. Children will be used for children buttons.
                    parent,
                    header: topic.topicName,
                    children,
                });
                
                console.log("HAYYYasdYYY",mainArticle)
            });
        } catch (error) {
            res.status(500).send(
                'There was a problem retrieving from the database'
            );
        }
    });

    // Home page route
    app.get('/', async (req, res) => {
        db.topic.getChild(1).then((childData) => {
            const hbData = {
                children: childData,
            };
            res.render('home', hbData);
        });
    });
};
