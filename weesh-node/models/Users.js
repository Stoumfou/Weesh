var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, // Ce champ assure un index unique, pas un document unique (cf. la fonction de validation de username ci-dessous)
        required: [ true, 'User username is missing.' ]
    },
    hash: {
        type: String,
        required: [ true, 'User hash is missing.' ]
    },
    salt: {
        type: String,
        required: [ true, 'User salt is missing.' ]
    },
    firstName: {
        type: String,
//        required: [ true, 'User firstName is missing.' ]
    },
    lastName: {
        type: String,
//        required: [ true, 'User lastName is missing.' ]
    },
    gender: {
        type: String,
        required: [ true, 'User gender is missing.' ],
        uppercase: true,
        enum: { values: [ 'F', 'M' ], message: 'User gender should be either "F" or "M"' }
    },
    birthDate: {
        type: Date,
//        required: [ true, 'User birthDate is missing.' ]
    },
    email: {
        type: String,
//        required: [ true, 'User mail is missing.' ]
    },
    address: [{
        street: {
            type: String,
            required: [ true, 'User address street is missing.' ]
        },
        city: {
            type: String,
            required: [ true, 'User address city is missing.' ]
        },
        zip: {
            type: String,
            required: [ true, 'User address zip is missing.' ]
        }
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
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

var User = mongoose.model('User', UserSchema);

// Valide si l'username n'existe pas déjà
User.schema.path('username').validate(function(value, next) {
    User.findOne({'username': value}, function(err, user) {
        if (err) {
            return next(err);
        }
        // Si un utilisateur avec ce username existe déjà, on retourne false
        // (car le username doit être unique), sinon true
        return next(!user);
    });
}, 'User username already exist.', 'Duplicate username');

/** A décommenter quand le formulaire d'inscription aura intégré l'adresse
// Valide si l'adresse est présente
// (On utilise un validateur custom car on ne peut pas mettre un validateur 'required'
// sur un schéma imbriqué comme 'address' sans créer un nouveau document 'address' en base)
User.schema.path('address').validate(function(value) {
    if (!value || value.length === 0) {
        return false;
    }
    return true;
}, 'User address is required.', 'required');
**/

// Valide le format de l'adresse mail
User.schema.path('email').validate(function(value) {
    var regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regex.test(value);
}, 'User email format is invalid.', 'Invalid email');