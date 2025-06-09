const Achat = require('../models/achat.model.js');

// Create and Save a new achat
exports.create = (req, res) => {
    // Validate request
    if (!req.body.idProduit) {
        return res.status(400).send({
            message: "achat content can not be empty"
        });
    }

    // Create an achat
    const achat = new Achat({
        idProduit: req.body.idProduit || "Untitled Admin",
        quantiteProduit: req.body.quantiteProduit,
        dateAchat: req.body.dateAchat,
        montantAchat: req.body.montantAchat

    });

    // Save achat in the database
    achat.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the achat."
            });
        });
};

// Retrieve and return all achat from the database.
exports.findAll = (req, res) => {
    Achat.find()
        .then(achats => {
            res.send(achats);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving achats."
            });
        });
};

// Find a single achat with a achatId
exports.findOne = (req, res) => {
    Achat.findById(req.params.achatId)
        .then(achat => {
            if (!achat) {
                return res.status(404).send({
                    message: "achat not found with id " + req.params.achatId
                });
            }
            res.send(achat);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "achat not found with id " + req.params.achatId
                });
            }
            return res.status(500).send({
                message: "Error retrieving achat with id " + req.params.achatId
            });
        });
};

// Update a achat identified by the achatId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.idProduit) {
        return res.status(400).send({
            message: "achat content can not be empty"
        });
    }

    // Find achat and update it with the request body
    Achat.findByIdAndUpdate(req.params.achatId, {
        idProduit: req.body.idProduit || "Untitled Admin",
        quantiteProduit: req.body.quantiteProduit,
        dateAchat: req.body.dateAchat,
        montantAchat: req.body.montantAchat

    }, { new: true })
        .then(achat => {
            if (!achat) {
                return res.status(404).send({
                    message: "achat not found with id " + req.params.achatId
                });
            }
            res.send(achat);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "achat not found with id " + req.params.achatId
                });
            }
            return res.status(500).send({
                message: "Error updating achat with id " + req.params.achatId
            });
        });
};

// Delete a achat with the specified adminId in the request
exports.delete = (req, res) => {
    Achat.findByIdAndRemove(req.params.achatId)
        .then(achat => {
            if (!achat) {
                return res.status(404).send({
                    message: "achat not found with id " + req.params.achatId
                });
            }
            res.send({ message: "achat deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "achat not found with id " + req.params.achatId
                });
            }
            return res.status(500).send({
                message: "Could not delete achat with id " + req.params.achatId
            });
        });
};
