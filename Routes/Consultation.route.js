const express = require("express");
const router = express.Router();

const ConsultationController = require("../Controllers/Consultation.Controller");

router.get("/", ConsultationController.getAllConsultation);
router.post("/", ConsultationController.createNewConsultation);
router.get("/:id", ConsultationController.getConsultationById);
router.get("/:patientId/:userId", ConsultationController.getConsultationPatient);
router.patch("/:id", ConsultationController.updateConsultation);
router.delete("/:id", ConsultationController.deleteConsultation);

module.exports = router;