const Produit = require('../models/produit.model.js');

// Create and Save a new produit
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nom) {
        return res.status(400).send({
            message: "produit content can not be empty"
        });
    }

    // Create a produit
    const produit = new Produit({
        nom: req.body.nom || "Untitled Produit",
        prix: req.body.prix,
        quantite: req.body.quantite,
        description: req.body.description,
        image: req.body.image
    });

    // Save produit in the database
    produit.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the produit."
            });
        });
};

// Retrieve and return all produit from the database.
exports.findAll = (req, res) => {
    Produit.find()
        .then(produits => {
            res.send(produits);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving produits."
            });
        });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Produit.findById(req.params.produitId)
        .then(produit => {
            if (!produit) {
                return res.status(404).send({
                    message: "produit not found with id " + req.params.produitId
                });
            }
            res.send(produit);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "produit not found with id " + req.params.produitId
                });
            }
            return res.status(500).send({
                message: "Error retrieving produit with id " + req.params.produitId
            });
        });
};

exports.update = (req, res) => {
    // Find product and update it with the request body
    Produit.findById(req.params.produitId)
        .then((produit) => {
            if (!produit) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.produitId,
                });
            }

            // Prepare fields to update
            const updateFields = {};
            if (req.body.nom) updateFields.nom = req.body.nom;
            if (req.body.prix) updateFields.prix = req.body.prix;
            if (req.body.quantite) updateFields.quantite = req.body.quantite;
            if (req.body.description)
                updateFields.description = req.body.description;
            if (req.body.image) updateFields.image = req.body.image;

            // Find product and update it with the specified fields
            Produit.findByIdAndUpdate(req.params.produitId, updateFields, {
                new: true,
            })
                .then((updatedProduit) => {
                    res.send(updatedProduit);
                })
                .catch((err) => {
                    console.error("Database Error:", err);
                    res.status(500).json({
                        message:
                            "Error updating product with id " + req.params.produitId,
                        error: err,
                    });
                });
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "product not found with id " + req.params.produitId,
                });
            }
            return res.status(500).send({
                message: "Error retrieving product with id " + req.params.produitId,
            });
        });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    Produit.findByIdAndRemove(req.params.produitId)
        .then(produit => {
            if (!produit) {
                return res.status(404).send({
                    message: "produit not found with id " + req.params.produitId
                });
            }
            res.send({ message: "produit deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "produit not found with id " + req.params.produitId
                });
            }
            return res.status(500).send({
                message: "Could not delete produit with id " + req.params.produitId
            });
        });
};
