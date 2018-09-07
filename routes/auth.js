const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const User =  mongoose.model('User');
const token_auth = require("../config/token_auth");

router.post("/register", token_auth.optional, (req, res) => {
    const {user} = req.body;

    const missingField = fieldsProbe(user, res);
    if(missingField){
        return missingField;
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
                        .then(() => res.json({user: finalUser.toAuthJSON() }));
            }
        }
    });

});


router.post("/login", token_auth.optional, (req, res, next) => {
    const {user} = req.body;

    const missingField = fieldsProbe(user, res);
    if(missingField){
        return missingField;
    }

    return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
        if(err){
            return next(err);
        }

        if(passportUser){
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({user: user.toAuthJSON() });
        }

        return status(400).info;

    })(req, res, next);
});

function fieldsProbe(user, res){
    if(!user.email){
       return res.status(422).json({
            errors: {
                email: 'is required'
            }
        });
    }

    if(!user.password){
       return res.status(422).json({
            errors: {
                password: "is required"
            }
        });
    }
}

module.exports = router;