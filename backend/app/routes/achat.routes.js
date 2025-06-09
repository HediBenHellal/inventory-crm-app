module.exports = (app) => {
    const achats = require('../controllers/achat.controller.js');


    app.post('/achats', achats.create);


    app.get('/achats', achats.findAll);


    app.get('/achats/:achatId', achats.findOne);


    app.put('/achats/:achatId', achats.update);


    app.delete('/achats/:achatId', achats.delete);
}
