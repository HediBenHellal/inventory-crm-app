const mongoose = require('mongoose');

const PaiementSchema = mongoose.Schema({
    idClient: String,
    idContrat: String,
    numRecu: {
        type: String,
        unique: [true, 'The Receipt Number is unique']
    },
    nomAgent: String,
    datePaiement: String,
    montantPaye: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Paiement', PaiementSchema);