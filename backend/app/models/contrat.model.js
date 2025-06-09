const mongoose = require('mongoose');

const ContratSchema = mongoose.Schema({
    idClient: String,
    idProduit: String,
    nomVendeur: String,
    numContrat: {
        type: String,
        unique: [true, 'Contract Number is unique']
    },
    dateContrat: String,
    prixVente: String,
    avance: String,
    prixReste: String,
    dureePaiement: String,
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Contrat', ContratSchema);