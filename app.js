const express = require("express");
const app = express();
const path = require("path") ;
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");
const mongoose = require("mongoose");

// Db setup
mongoose.promise = global.Promise;
mongoose.connect("mongodb://localhost/youtweet");
mongoose.set('debug', true);

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: 's',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}));

require('./models/User');
require('./config/passport');


app.get('/', (req, res) => res.send('The world is my oyster.'));
app.use(require('./routes'));

app.listen(3000, () => console.log('Serving on port 3000!'));
