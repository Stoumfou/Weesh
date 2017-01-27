var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var consts = require('../config/consts.js');
var auth = jwt({
    secret: process.env.WEESH_TOKEN_SIGN
    , userProperty: 'payload'
}); // WEESH_TOKEN_SIGN est une variable d'environnement
var mongoose = require('mongoose');
var passport = require('passport');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Weeshlist = mongoose.model('Weeshlist');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('pages/index', {
        title: 'Express'
    });
});
// Charge un utilisateur au préalable sur des routes incluant ':userId' (=username)
router.param('userId', function (req, res, next, id) {
    //    var query = User.findById(id);
    var query = User.findOne({
        username: id
    });
    query.exec(function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new Error("Utilisateur (username=" + id + ") non existant."));
        }
        req.user = user;
        return next();
    });
});
// Charge un produit au préalable sur des routes incluant ':productId' (=sku)
router.param('productId', function (req, res, next, id) {
    //    var query = Product.findById(id);
    var query = Product.findOne({
        sku: id
    });
    query.exec(function (err, product) {
        if (err) {
            return next(err);
        }
        if (!product) {
            return next(new Error("Produit (sku=" + id + ") non existant."));
        }
        req.product = product;
        return next();
    });
});
// Charge une weeshlist au préalable sur des routes incluant ':weeshlistId' (=title formaté en URL)
// Note : Ce weeshlistId doit être encodé au préalable avec encodeURIComponent(id)
router.param('weeshlistId', function (req, res, next, id) {
    //    var query = Weeshlist.findById(id);
    var urlId = decodeURIComponent(id); // On transforme l'URL en texte originel
    var query = Weeshlist.findOne({
        owner: req.user._id
        , title: urlId
    });
    query.exec(function (err, weeshlist) {
        if (err) {
            return next(err);
        }
        if (!weeshlist) {
            return next(new Error("Weeshlist (title=" + id + ") non existant."));
        }
        req.weeshlist = weeshlist;
        return next();
    });
});
// Inscrit un utilisateur
router.post('/register', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Nom d\'utilisateur ou mot de passe manquant.'
        });
    }
    // La date doit être au format MM-JJ-YYY
    var user = new User(req.body);
    user.setPassword(req.body.password);
    user.save(function (err) {
        if (err) {
            return next(err);
        }

        return res.json({
            token: user.generateJWT()
        })
    });
});
// Connecte un utilisateur
router.post('/login', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Nom d\'utilisateur ou mot de passe manquant.'
        });
    }
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.json({
                token: user.generateJWT()
            });
        }
        else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});
// Renvoie la liste des utilisateurs
// Note : une date locale est automatiquement enregistrée en UTC dans la base Mongo
// Lorsque l'on récupère une date de la base, elle est en UTC, mais .toString() la convertit en heure locale
router.get('/users', function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            return next(err);
        }
        res.json(users);
    });
});
// Renvoie un utilisateur
router.get('/users/:userId', function (req, res, next) {
    req.user.populate('products', function (err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});
/**
 * TODO MHU à modifier pour que l'utilisateur corresponde à la personne connectée (req.payload.username) ?
 * TODO MHU Même réflexion pour les autres routes nécessaires
 */
// Ajoute une weeshlist à un utilisateur
router.post('/users/:userId/weeshlists', function (req, res, next) {
    var weeshlist = new Weeshlist(req.body);
    weeshlist.owner = req.user._id;
    weeshlist.save(function (err, weeshlist) {
        if (err) {
            return next(err);
        }
        res.json(weeshlist);
    });
});
// Renvoie la liste des weeshlists d'un utilisateur
router.get('/users/:userId/weeshlists', function (req, res, next) {
    Weeshlist.find({
        owner: req.user._id
    }, function (err, weeshlists) {
        if (err) {
            return next(err);
        }
        res.json(weeshlists);
    });
});
// Renvoie une weeshlist
router.get('/users/:userId/weeshlists/:weeshlistId', function (req, res, next) {
    req.weeshlist.populate('products', function (err, weeshlist) {
        if (err) {
            return next(err);
        }
        res.json(weeshlist);
    });
});
// Ajoute un produit à un utilisateur
router.put('/users/:userId/products/:productId', function (req, res, next) {
    req.user.products.push(req.product);
    req.user.save(function (err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});
// Ajoute un produit à une weeshlist
router.put('/users/:userId/weeshlists/:weeshlistId/products/:productId', function (req, res, next) {
    req.weeshlist.products.push(req.product);
    req.weeshlist.save(function (err, weeshlist) {
        if (err) {
            return next(err);
        }
        res.json(weeshlist);
    });
});
// Renvoie la liste des produits
router.get('/products', function (req, res, next) {
    Product.find(function (err, products) {
        if (err) {
            return next(err);
        }
        res.json(products);
    });
});
// Ajoute un produit
router.post('/products', function (req, res, next) {
    var product = new Product(req.body);
    product.save(function (err, product) {
        if (err) {
            return next(err);
        }
        res.json(product);
    });
});
module.exports = router;