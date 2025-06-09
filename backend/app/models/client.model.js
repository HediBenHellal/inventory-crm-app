const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    prenom: String,
    nom: String,
    numCin: {
        type: String,
        unique: [true, 'The Card Number is unique']
    },
    numTel: {
        type: String,
        unique: [true, 'The Tel Number is unique']

    },
    dateNaissance: String,
    adresse: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);