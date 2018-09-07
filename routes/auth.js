const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const User =  mongoose.model('User');

router.post("/register", (req, res, next) => {
    const {user} = req.body;
    if(!user.email){
        res.status(422).json({
            errors: {
                email: 'is required'
            }
        });
    }

    if(!user.password){
        res.status(422).json({
            errors: {
                password: "is required"
            }
        });
    }

    User.findOne({email: user.email}, (err, userDoc) => {
        if(err){
            res.status(500).send('db/server error occured')
        } else {
            if(userDoc){
                res.status(500).send('Username already exists');
            } else {
                const finalUser = new User(user);
                finalUser.setPassword(user.password);
                return finalUser.save()
                        .then(() => res.json({userSaved: true}));
            }
        }
    });

});

module.exports = router;