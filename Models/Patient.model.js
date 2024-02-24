const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//ASPECTS SOCIO-DEMOGRAPHIQUES
const PatientSchema = new Schema({
    prenom:{
        type:String,
        required:true
    },
    nom:{
        type:String,
        required:true
    },
    statut:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    adresse:{
        type:String,
        required:true
    },
    telephone:{
        type:String,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    niveau_socioeconomique:{
        type:String,
        required:true
    }
},{ timestamps: true });

const Patient = mongoose.model('Patient',PatientSchema);
module.exports = Patient;