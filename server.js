// Import our requirements
const express = require('express');
const exphbs = require('express-handlebars');
const birds = 15000

// Load models folder
const db = require('./models')

// Port information
const PORT = process.env.PORT || 8080;

let app = express();

// Routes
require(`./routes/publicRoutes.js`)(app);

// Set Handlebars as the default templating engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Static directory
app.use(express.static('public/styles'))

let testDB = [
  {
    href: "https://en.wikipedia.org/wiki/Footwear",
    score: 32,
  },
  {
    href: "https://www.dolitashoes.com/blogs/news/the-history-and-evolution-of-shoes",
    score: 17,
  },
  {
    href: "https://allthatsinteresting.com/fascinating-history-footwear",
    score: -100,
  }
];

app.get('/', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let main;
  let altArticles = [];
  for (let i = 0; i < testDB.length; i++) {
    let article = new Article(testDB[i].href, testDB[i].source, browser, page);
    let [header, summary] = ["", ""];
    let source = article.getSource();
    if (i === 0) {
      [header, summary] = await article.getInfo(true);
      main = {
        header: header,
        summary: summary,
        score: testDB[i].score,
        href: testDB[i].href,
        source: source
      };
    }
    else {
      [header, summary] = await article.getInfo(false);
      altArticles.push({
        header: header,
        summary: summary,
        score: db[i].score,
        href: db[i].href,
        source: source
      });
    }
  }

  res.render('index', {
    main: main,
    alts: altArticles
  });
})

//Starts the server to begin listening
db.sequelize
    .sync()
    .then(() =>
        app.listen(PORT, () => console.log(`${birds} ducks are listening in on PORT ${PORT}`))
    )
