const express = require('express');
const seed = require('/config/db/db_seed.js');
const app = express();
// CREATE APP CONF

app.use('/lib', express.static(__dirname + '/client/public/'));

// CREATE ROUTES API
app.get('/', function (req, res) {
  res.sendFile( __dirname +  "/client/index.html" );
});

// START server

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

