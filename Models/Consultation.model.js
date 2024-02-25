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
    motif: {
        type:String,
        required:true
    },
    complet: Boolean
},{timestamps:true});

const Consultation = mongoose.model('Consultation', ConsultationSchema);
module.exports = Consultation;
