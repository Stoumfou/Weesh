var mongoose = require('mongoose');

var WeeshlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, 'Weeshlist title is missing.' ]
    },
    visibility: {
        type: String,
        required: [ true, 'Weeshlist visibility is missing.' ],
        uppercase: true,
        enum: {
            values: [ 'PRIVATE', 'SHARED', 'PUBLIC' ],
            message: 'Weeshlist visibility should be either "PRIVATE" or "SHARED" or "PUBLIC".'
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [ true, 'Weeshlist owner is missing.' ]
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

var Product = mongoose.model('Weeshlist', WeeshlistSchema);