var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var consts = require('../config/consts.js');
var auth = jwt({ secret: process.env.WEESH_TOKEN_SIGN, userProperty: 'payload' }); // WEESH_TOKEN_SIGN est une variable d'environnement

var mongoose = require('mongoose');
var passport = require('passport');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index', { title: 'Express' });
});

// Inscrit un utilisateur
router.post('/register', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe manquant.' });
    }

    // La date doit être au format MM-JJ-YYY
    var user = new User(req.body);
    user.setPassword(req.body.password);

    user.save(function (err) {
        if (err) { return next(err); }

        return res.json({ token: user.generateJWT() })
    });
});

// Connecte un utilisateur
router.post('/login', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe manquant.' });
    }

    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }

        if (user) {
            return res.json({ token: user.generateJWT() });
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

// Renvoie la liste des utilisateurs
// Note : une date locale est automatiquement enregistrée en UTC dans la base Mongo
// Lorsque l'on récupère une date de la base, elle est en UTC, mais .toString() la convertit en heure locale
router.get('/users', function(req, res, next) {
    User.find(function(err, users){
        if (err) {
            return next(err);
        }

        res.json(users);
    });
});

// Renvoie la liste des produits
router.get('/products', function(req, res, next) {
    Product.find(function(err, products){
        if (err) {
            return next(err);
        }

        res.json(products);
    });
});

// Ajoute un produit
router.post('/products', function(req, res, next) {
    var product = new Product(req.body);

    product.save(function(err, product) {
        if (err) {
            return next(err);
        }

        res.json(product);
    });
});

module.exports = router;