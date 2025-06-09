const Paiement = require('../models/paiement.model.js');

// Create and Save a new paiement
exports.create = (req, res) => {
    // Validate request
    if (!req.body.idClient) {
        return res.status(400).send({
            message: "paiement content can not be empty"
        });
    }

    // Create a directeur
    const paiement = new Paiement({
        idClient: req.body.idClient || "Untitled Paiement",
        idContrat: req.body.idContrat,
        numRecu: req.body.numRecu,
        nomAgent: req.body.nomAgent,
        datePaiement: req.body.datePaiement,
        montantPaye: req.body.montantPaye
    });

    // Save admin in the database
    paiement.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the paiement."
            });
        });
};

// Retrieve and return all paiement from the database.
exports.findAll = (req, res) => {
    Paiement.find()
        .then(paiements => {
            res.send(paiements);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving paiements."
            });
        });
};

// Find a single paiement with a directeurId
exports.findOne = (req, res) => {
    Paiement.findById(req.params.paiementId)
        .then(paiement => {
            if (!paiement) {
                return res.status(404).send({
                    message: "paiement not found with id " + req.params.paiementId
                });
            }
            res.send(paiement);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "paiement not found with id " + req.params.paiementId
                });
            }
            return res.status(500).send({
                message: "Error retrieving paiement with id " + req.params.paiementId
            });
        });
};

// Update a directeur identified by the paiementId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.idClient) {
        return res.status(400).send({
            message: "paiement content can not be empty"
        });
    }

    // Find paiement and update it with the request body
    Paiement.findByIdAndUpdate(req.params.paiementId, {
        idClient: req.body.idClient || "Untitled Paiement",
        idContrat: req.body.idContrat,
        numRecu: req.body.numRecu,
        nomAgent: req.body.nomAgent,
        datePaiement: req.body.datePaiement,
        montantPaye: req.body.montantPaye
    }, { new: true })
        .then(paiement => {
            if (!paiement) {
                return res.status(404).send({
                    message: "paiement not found with id " + req.params.paiementId
                });
            }
            res.send(paiement);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "paiement not found with id " + req.params.paiementId
                });
            }
            return res.status(500).send({
                message: "Error updating paiement with id " + req.params.paiementId
            });
        });
};

// Delete a paiement with the specified paiementId in the request
exports.delete = (req, res) => {
    Paiement.findByIdAndRemove(req.params.paiementId)
        .then(paiement => {
            if (!paiement) {
                return res.status(404).send({
                    message: "paiement not found with id " + req.params.paiementId
                });
            }
            res.send({ message: "paiement deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "paiement not found with id " + req.params.paiementId
                });
            }
            return res.status(500).send({
                message: "Could not delete paiement with id " + req.params.paiementId
            });
        });
};
