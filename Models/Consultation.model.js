const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConsultationSchema = new Schema({
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
    date: {
        type:String,
        required:true
    },
    motif: {
        type:String,
        required:true
    },
    complet: Boolean
});

const Consultation = mongoose.model('Consultation', ConsultationSchema);
module.exports = Consultation;
