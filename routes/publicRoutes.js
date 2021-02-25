// Import our requirements
const db = require('../models')
const puppeteer = require('puppeteer')

// const Article = require('./components/Article');

module.exports = (app) => {
    app.get('/', async (req, res) => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        // Mamamia papapia, we ain't gettin no wiki-ria
        // let wiki = new Article("https://en.wikipedia.org/wiki/Footwear", 32, browser, page);
        // let [header, summary] = await wiki.getInfo(true);

        await db.topic.getTopic(1).then((dbTopic) => {
            console.log('topic: ', dbTopic)

            const hbData = {
                // href: wiki.href,
                header: dbTopic.topicName,
                score: '+9001',
                // score: wiki.score,
                summary: 'the cake is a lie',
                // source: wiki.getSource()
            }

            // The information belowe will feed into the handlebar renderer

            // Handlebar renderer
            res.render('index', hbData)
        })
    })
}
// haha code go boom
