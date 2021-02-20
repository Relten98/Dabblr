// Dependencies / Important stuff
const express = require('express');
const birds = 15000
const app = express();

const PORT = process.env.PORT || 8080;


// The magic that stats this whole thing
app.listen(PORT, function () {
    console.log(`Woo Yeah Baby! That's What I've Been Waiting For!`);
    console.log(`Application is listening on port: ${PORT}`);
    console.log(`And there are currenly ${birds} birds flying in the sky.`);
});
