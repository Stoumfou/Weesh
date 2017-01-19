var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true },
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60); // Durée de vie du token : 60 jours

    return jwt.sign({
        _id: this.id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000) // En millisecondes
    }, process.env.WEESH_TOKEN_SIGN); // WEESH_TOKEN_SIGN est une variable d'environnement
};

mongoose.model('User', UserSchema);