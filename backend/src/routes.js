const express =  require('express');
const routes =  express.Router();
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
///SESSION HANDLER
routes.post('/session',SessionController.login);

////ONGS HANDLER
routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.list);

/// INCIDENTS HANDLER
routes.post('/incidents',IncidentController.create);
routes.get('/incidents',IncidentController.list);
routes.delete('/incidents/:id',IncidentController.delete);

/// PROFILE HANDLER
routes.get('/profile',ProfileController.list);



module.exports = routes;