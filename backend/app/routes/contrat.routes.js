module.exports = (app) => {
    const contrats = require('../controllers/contrat.controller.js');


    app.post('/contrats', contrats.create);


    app.get('/contrats', contrats.findAll);


    app.get('/contrats/:contratId', contrats.findOne);


    app.put('/contrats/:contratId', contrats.update);


    app.delete('/contrats/:contratId', contrats.delete);
}
