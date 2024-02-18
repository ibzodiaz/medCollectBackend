const express = require('express');
const router = express.Router(); // Ajoutez cette ligne pour créer un objet router

const AntecedentController = require('../Controllers/Antecedent.Controller');

router.get('/', AntecedentController.getAllAntecedent);
router.post('/', AntecedentController.createNewAntecedent);
//router.get('/:id', AntecedentController.getAntecedentById);
router.get('/:patientId', AntecedentController.getAntecedentOne);
router.patch('/:patientId', AntecedentController.updateAntecedent);
router.delete('/:patientId', AntecedentController.deleteAntecedent);

module.exports = router;
