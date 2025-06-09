const mongoose = require('mongoose');

const AchatSchema = mongoose.Schema({
    idProduit: String,
    quantiteProduit: String,
    dateAchat: String,
    montantAchat: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Achat', AchatSchema);