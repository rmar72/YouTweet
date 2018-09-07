const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { Schema }  = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    }
});

UserSchema.methods.setPassword = password => {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
}

UserSchema.methods.validatePassword = password => {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, "sha512").toString("hex");
    return this.hash === hash;
}

module.exports = mongoose.model("User", UserSchema);