const express = require("express");
const router = express.Router();

const PrescriptionController = require("../Controllers/Prescription.Controller");

router.get("/:patientId/:consultationId", PrescriptionController.getPrescriptionByPatient);
router.post("/", PrescriptionController.createNewPrescription);
router.patch("/:id", PrescriptionController.updatePrescription);
router.delete("/:id", PrescriptionController.deletePrescription);
router.delete("/:patientId/:consultationId", PrescriptionController.deletePrescriptionByConsultation);

module.exports = router;