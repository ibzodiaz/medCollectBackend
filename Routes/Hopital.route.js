const express = require('express');
const router = express.Router(); // Ajoutez cette ligne pour créer un objet router

const HopitalController = require('../Controllers/Hopital.Controller');

router.get('/', HopitalController.getAllHopital);
router.post('/', HopitalController.createNewHopital);
router.get('/:id', HopitalController.getHopitalById);
router.patch('/:id', HopitalController.updateHopital);
router.delete('/:id', HopitalController.deleteHopital);

module.exports = router;
