var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    sku: {
        type: String,
        unique: true, // Ce champ assure un index unique, pas un document unique (cf. la fonction de validation de sku ci-dessous)
        required: [ true, 'Product SKU is missing.' ]
    },
    name: String,
    providers: [{
        name: String,
        productUrl: String
    }],
    price: Number,
    shippings: [{
        cost: Number,
        delay: Number
    }],
    ecoGrade: Number,
    sales: [{
        startDate: Date,
        endDate: Date,
        newPrice: Number
    }]
});

var Product = mongoose.model('Product', ProductSchema);

Product.schema.path('sku').validate(function(value, next) {
    Product.findOne({'sku': value}, function(err, product) {
        if (err) {
            return next(err);
        }
        // Si un produit avec ce SKU existe déjà, on retourne false
        // (car le SKU doit être unique), sinon true
        return next(!product);
    });
}, 'Product SKU already exist.', 'Duplicate SKU');