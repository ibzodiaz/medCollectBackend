const express = require("express");
const router = express.Router();
const FichiersController = require("../Controllers/Fichiers.Controller");
const fileUpload = require('express-fileupload');

// Configuration de express-fileupload
router.use(fileUpload());

// Middleware pour restreindre les types de fichiers autorisés
// router.use((req, res, next) => {
//     if (req.files) {
//       const file = req.files.fileInput;
//       const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Types MIME autorisés
//       if (!allowedTypes.includes(file.mimetype)) {
//         return res.status(400).send('Seuls les fichiers JPEG, PNG et PDF sont autorisés.');
//       }
//     }
//     next();
// });

router.get("/", FichiersController.getAllFichiers);
router.post("/", FichiersController.createNewFichiers);
router.get("/:patientId/:userId", FichiersController.getFichiersPatient);
router.patch("/:id", FichiersController.updateFichiers);
router.delete("/:id", FichiersController.deleteFichiers);

module.exports = router;