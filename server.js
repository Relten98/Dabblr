const express = require('express');
const exphbs = require('express-handlebars');
const puppeteer = require('puppeteer');
const Article = require('./components/Article');


const PORT = process.env.PORT || 8080;

let app = express();

// Set Handlebars as the default templating engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(express.static(__dirname + '/public/styles'));

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

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);