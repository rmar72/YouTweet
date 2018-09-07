const express = require("express");
const app = express();
const path = require("path") ;
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");


app.get('/', (req, res) => res.send('The world is my oyster.'))

app.listen(3000, () => console.log('Serving on port 3000!'))
