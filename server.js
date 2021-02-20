// Dependencies / Important stuff
const express = require('express');
const app = express();

// Important for future bird counting reference.
const birds = 15000

// Port
const PORT = process.env.PORT || 8080;

// Other server stuff will go below this line.
// ///////////////////////////////////////////



// The magic that stats this whole thing
app.listen(PORT, function () {
    console.log(`Application is listening on port: ${PORT}`);
    console.log(`And there are currenly ${birds} birds flying in the sky.`);
});
