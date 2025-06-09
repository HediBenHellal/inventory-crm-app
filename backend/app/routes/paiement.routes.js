module.exports = (app) => {
    const paiements = require('../controllers/paiement.controller.js');


    app.post('/paiements', paiements.create);


    app.get('/paiements', paiements.findAll);


    app.get('/paiements/:paiementId', paiements.findOne);


    app.put('/paiements/:paiementId', paiements.update);


    app.delete('/paiements/:paiementId', paiements.delete);
}
