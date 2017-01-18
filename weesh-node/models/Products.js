var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    sku: String,
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

mongoose.model('Product', ProductSchema);