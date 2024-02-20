const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// SIGNES PARACLINIQUES
const EvolutionSchema = new Schema({
   patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient'
   },
   evolutionApresSortie: {
        type: String,
        enum: ['3 mois', '6 mois', '9 mois', '12 mois']
    },
    classeNYHA: {
        type: String,
        enum: ['Récupération totale', 'Récupération partielle', 'Etat stationnaire', 'Dégradation de la qualité de vie', 'Décès']
    },
    detailsDeces: {
        date: Date,
        causes: String,
        lieu: {
        type: String,
        enum: ['Hôpital', 'Domicile']
        }
    },
   bonneObservanceTherapeutique: Boolean,
   nombreRehospitalisations: Number,
   facteursDecompensation: {
      anemie: Boolean,
      infectionsVirales: Boolean,
      infectionsBacteriennes: Boolean,
      denutrition: Boolean,
      rupturesTherapeutiques: Boolean
   },
   echocardiographie: {
    DTDVG: String,
    DTSVG: String,
    FEVG: String,
    FR: String, 
    e: String,
    a: String,
    td: String,
    ee: String,
    tapse: String,
    dtog:String
   },
   biologie: {
        hemoglobinemie: Number,
        gb: Number,
        plaquettes: Number,
        vgm: Number,
        ccmh: Number,
        tcmh: Number,
        crp: Number,
        uree: Number,
        creatininemie: Number,
        ntProBNP: Number,
        prolactine: Number
    },
   evolutionBebe: {
      mortNes: Boolean,
      faiblePoidsNaissance: Boolean,
      prematurite: Boolean,
      poidsNaissance: Number,
      alimentationNaissance: String,
      poids3Mois: Number,
      alimentation3Mois: String,
      poids6Mois: Number,
      alimentation6Mois: String,
      poids12Mois: Number,
      alimentation12Mois: String
   }
});


const Evolution = mongoose.model('Evolution', EvolutionSchema);
module.exports = Evolution;
