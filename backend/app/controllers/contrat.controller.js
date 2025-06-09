const Contrat = require('../models/contrat.model.js');

// Create and Save a new contrat
exports.create = (req, res) => {
    // Validate request
    if (!req.body.idClient) {
        return res.status(400).send({
            message: "contrat content can not be empty"
        });
    }

    // Create a contrat
    const contrat = new Contrat({
        idClient: req.body.idClient || "Untitled contrat",
        idProduit: req.body.idProduit,
        nomVendeur: req.body.nomVendeur,
        numContrat: req.body.numContrat,
        dateContrat: req.body.dateContrat,
        prixVente: req.body.prixVente,
        avance: req.body.avance,
        prixReste: req.body.prixReste,
        dureePaiement: req.body.dureePaiement,
       
    });

    // Save contrat in the database
    contrat.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the contrat."
            });
        });
};

// Retrieve and return all contrat from the database.
exports.findAll = (req, res) => {
    Contrat.find()
        .then(contrats => {
            res.send(contrats);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving contrats."
            });
        });
};

// Find a single contrat with a contratId
exports.findOne = (req, res) => {
    Contrat.findById(req.params.contratId)
        .then(contrat => {
            if (!contrat) {
                return res.status(404).send({
                    message: "contrat not found with id " + req.params.contratId
                });
            }
            res.send(contrat);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "contrat not found with id " + req.params.contratId
                });
            }
            return res.status(500).send({
                message: "Error retrieving contrat with id " + req.params.contratId
            });
        });
};

// Update a contrat identified by the contratId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.idClient) {
        return res.status(400).send({
            message: "contrat content can not be empty"
        });
    }

    // Find contrat and update it with the request body
    Contrat.findByIdAndUpdate(req.params.contratId, {
        idClient: req.body.idClient || "Untitled contrat",
        idProduit: req.body.idProduit,
        nomVendeur: req.body.nomVendeur,
        numContrat: req.body.numContrat,
        dateContrat: req.body.dateContrat,
        prixVente: req.body.prixVente,
        avance: req.body.avance,
        prixReste: req.body.prixReste,
        dureePaiement: req.body.dureePaiement,
    }, { new: true })
        .then(contrat => {
            if (!contrat) {
                return res.status(404).send({
                    message: "contrat not found with id " + req.params.contratId
                });
            }
            res.send(contrat);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "contrat not found with id " + req.params.contratId
                });
            }
            return res.status(500).send({
                message: "Error updating contrat with id " + req.params.contratId
            });
        });
};

// Delete a contrat with the specified contratId in the request
exports.delete = (req, res) => {
    Contrat.findByIdAndRemove(req.params.contratId)
        .then(contrat => {
            if (!contrat) {
                return res.status(404).send({
                    message: "contrat not found with id " + req.params.contratId
                });
            }
            res.send({ message: "contrat deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "contrat not found with id " + req.params.contratId
                });
            }
            return res.status(500).send({
                message: "Could not delete contrat with id " + req.params.contratId
            });
        });
};
