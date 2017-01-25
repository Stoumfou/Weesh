var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    sku: {
        type: String,
        unique: true, // Ce champ assure un index unique, pas un document unique (cf. la fonction de validation de sku ci-dessous)
        required: [ true, 'Product SKU is missing.' ]
    },
    name: String,
    provider: {
        name: String,
        productUrl: String
    },
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

// Valide si le sku n'existe pas déjà
Product.schema.path('sku').validate(function(value, next) {
    const isNew = this.isNew; // Pour y avoir accès dans le callback

    Product.findOne({'sku': value}, function(err, product) {
        if (err) {
            return next(err);
        }

        // S'il s'agit d'un update, il est normal que le sku existe déjà (il doit exister)
        // La validation retourne true
        if (!isNew) {
            return next(true);
        }

        // Si un produit avec ce SKU existe déjà, on retourne false
        // (car le SKU doit être unique), sinon true
        return next(!product);
    });
}, 'Product SKU already exists.', 'Duplicate SKU');