// Import our requirements
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv').config();

const birds = 15000;

// Load models folder
const db = require('./models');

// Port information
const PORT = process.env.PORT || 8080;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Set Handlebars as the default templating engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static directory
<<<<<<< HEAD
app.use(express.static('public/styles'))

// Routes
require(`./routes/publicRoutes.js`)(app);
=======
app.use(express.static('public'));
>>>>>>> 8f04ac8c847ce325ce175ba8163b02c7edb3685f

// Routes
require(`./routes/publicRoutes.js`)(app);
require(`./routes/apiRoutes.js`)(app);

// Starts the server to begin listening
<<<<<<< HEAD
// db.sequelize
//   .sync()
//   .then(() =>
//     app.listen(PORT, () => console.log(`${birds} ducks are listening in on PORT ${PORT}`))
//   )

app.listen(PORT, () => {
  console.log(`${birds} DUCKS ARE LISTENING IN ON PORT ${PORT}`);
})
=======
db.sequelize
    .sync()
    .then(() =>
        app.listen(PORT, () =>
            console.log(`${birds} ducks are listening in on PORT ${PORT}`)
        )
    );

// app.listen(PORT, () =>
//     console.log(`${birds} ducks are listening in on PORT ${PORT}`)
// )
>>>>>>> 8f04ac8c847ce325ce175ba8163b02c7edb3685f
