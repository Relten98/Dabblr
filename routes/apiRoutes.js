const sequelize = require('sequelize');
const db = require('../models');

module.exports = (app) => {
    app.post('/api/tutorial', (req, res) => {
        // console.log('req ', req);
        // console.log('req.body ', JSON.stringify(req.body.tutorialType));
        const userID = 1;
        res.send(req.body);
        try {
            db.tutorial
                .create({
                    tutorialType: req.body.tutorialType,
                    tutorialLink: req.body.tutorialLink,
                    fk_topicID: req.body.topicID,
                    fk_userID: userID,
                })
                .then(() => res.status(201));
        } catch (error) {
            res.status(500).send('There was a problem adding to the database');
        }
    });
};
