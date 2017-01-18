var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Product = mongoose.model('Product');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
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
