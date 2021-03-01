const sequelize = require('sequelize');
const db = require('../models');

module.exports = (app) => {
    app.post('/api/tutorial', (req, res) => {
        // console.log('req ', req);

        // console.log('req.body ', JSON.stringify(req.body.tutorialType));

        const userID = 1;
        db.tutorial
            .create({
                tutorialType: req.body.tutorialType,
                tutorialLink: req.body.tutorialLink,
                fk_topicID: req.body.topicID,
                fk_userID: userID,
            })
            .then(() =>
                res.status(201).send('Sucessfully added tutorial to database')
            )
            .catch((error) => {
                console.log('error', error);
                return res
                    .status(500)
                    .send('There was a problem adding to the database');
            });
    });

    app.post('/api/vote', (req, res) => {
        // console.log('req.body.voteType', req.body.voteType);
        // console.log('req.body.tutorialID', req.body.tutorialID);
        const userID = 1;

        db.vote
            .create({
                // voteType = 1 or -1
                voteType: req.body.voteType,
                fk_tutorialID: req.body.tutorialID,
                fk_userID: userID,
            })
            .then(() =>
                res.status(201).send('Successfuly added vote to database')
            )
            .catch(() => {
                res.status(500).send(
                    'There was a problem adding to the database'
                );
            });
    });
};
