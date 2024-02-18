const express = require('express');
const router = express.Router(); // Ajoutez cette ligne pour créer un objet router

const PlanningController = require('../Controllers/Planning.Controller');

router.get('/', PlanningController.getAllPlanning);
router.post('/', PlanningController.createNewPlanning);
//router.get('/:id', PlanningController.getPlanningById);
router.get('/:userId', PlanningController.getPlanningByUserId);
router.patch('/:id', PlanningController.updatePlanning);
router.delete('/:id', PlanningController.deletePlanning);

module.exports = router;
