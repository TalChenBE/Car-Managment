const express = require('express');
const dashboard = require('../modules/dashboard/dashboardService');
const verifyJWT = require('../middleware/verifyJWT');

const treatments = express.Router();

treatments.use(verifyJWT);

treatments.post('/treatment/create', dashboard.addTreatment);
treatments.get('/treatments', dashboard.getAllTreatments);
treatments.delete('/treatments', dashboard.deleteTreatment);
treatments.put('/treatments', dashboard.editTreatment);

module.exports = treatments;
