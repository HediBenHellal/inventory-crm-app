const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, ' Username is unique']
    },
    email: {
        type: String,
        unique: [true, ' Email is unique']
    },
    password: String,
    statut: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);