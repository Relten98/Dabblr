const express = require('express');
const exphbs = require('express-handlebars');
const Article = require('./components/Article');


const PORT = process.env.PORT || 8080;

let app = express();

// Set Handlebars as the default templating engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
  .use(express.json())
  // .use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  let wiki = new Article("https://en.wikipedia.org/wiki/Footwear", 32);
  let summary = await wiki.getSummary(true)
  res.render('index', {
    summary: summary
  });
})

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);