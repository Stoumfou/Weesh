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

var Weeshlist = mongoose.model('Weeshlist', WeeshlistSchema);

// Définition des index secondaires (à champs multiples)
Weeshlist.schema.index({ owner: 1, title: 1}, { unique: true }); // Des index uniques de title par User

// Valide si le title n'existe pas déjà pour cet utilisateur
Weeshlist.schema.path('title').validate(function(value, next) {
    const isNew = this.isNew; // Pour y avoir accès dans le callback

    Weeshlist.findOne({ 'owner': this.owner, 'title': value}, function(err, weeshlist) {
        if (err) {
            return next(err);
        }

        // S'il s'agit d'un update, il est normal que le title existe déjà (il doit exister)
        // La validation retourne true
        if (!isNew) {
            return next(true);
        }

        // Si une weeshlist avec ce title existe déjà, on retourne false
        // (car le title doit être unique), sinon true
        return next(!weeshlist);
    });
}, 'Weeshlist title already exists for user.', 'Duplicate title');