const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FichierSchema = new Schema({
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
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true }

},{timestamps:true});

const Fichier = mongoose.model('Fichier', FichierSchema);
module.exports = Fichier;
