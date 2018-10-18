const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const User =  mongoose.model('User');
const token_auth = require("../config/token_auth");

router.post('/tweet-video', token_auth.required, (req, res) => {
    let url ='https://www.youtube.com/watch?v='+ req.body.video.url;
    console.log(url)
    res.json({'video to be tweeted': url})
});

module.exports = router;