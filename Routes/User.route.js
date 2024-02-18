
const express = require("express");
const router = express.Router();

const userCtrl = require("../Controllers/User.Controller");

/*** Middleware pour logger dates de requete */
router.use( (req, res, next) => {
    const event = new Date()
    console.log('User Time:', event.toString())
    next()
})

router.get('/', userCtrl.getAllUsers)

router.get('/:id', userCtrl.getUser)

router.get('/usersbyhopital/:hopitalId', userCtrl.getUsersByIdHopital)

router.put('/', userCtrl.addUser)

router.patch('/:id', userCtrl.updateUser)

router.post('/untrash/:id', userCtrl.untrashUser)

router.delete('/trash/:id', userCtrl.trashUser)
    
router.delete('/:id', userCtrl.deleteUser)

module.exports = router;