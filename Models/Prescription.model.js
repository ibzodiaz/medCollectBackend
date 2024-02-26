const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    consultationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultation',
        required: true
    },
    posologie: {
        type:String,
        required:true
    },
    medicament: {
        type:String,
        required:true
    }
},{timestamps:true});

const Prescription = mongoose.model('Prescription', PrescriptionSchema);
module.exports = Prescription;
