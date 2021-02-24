const express = require('express');
const exphbs = require('express-handlebars');
const puppeteer = require('puppeteer');
const Article = require('./components/Article');

// Load models folder
const db = require('./models')


const PORT = process.env.PORT || 8080;

let app = express();

// Set Handlebars as the default templating engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Static directory
app.use(express.static('public'))

app.get('/', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let wiki = new Article("https://en.wikipedia.org/wiki/Footwear", 32, browser, page);
  let [header, summary] = await wiki.getInfo(true);

  
  res.render('index', {
    href: wiki.href,
    header: header,
    score: wiki.score,
    summary: summary, 
    source: wiki.getSource()
  });
})

// Starts the server to begin listening
db.sequelize
    .sync()
    .then(() =>
        app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
    )
