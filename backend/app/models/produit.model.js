const mongoose = require('mongoose');

const ProduitSchema = mongoose.Schema({
    nom: String,
    prix: String,
    quantite: String,
    description: String,
    image: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Produit', ProduitSchema);