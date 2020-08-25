const express = require('express');
const app = express();

// CREATE ROUTES API
app.get('/', function (req, res) {
  res.sendFile( __dirname +  "/client/index.html" );
});

// START server

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

