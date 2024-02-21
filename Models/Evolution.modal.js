const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// SIGNES PARACLINIQUES
const EvolutionSchema = new Schema({
   patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient'
   },
   mere:{
      presente:Boolean,
      evolutionApresSortie: {
         type: String,
         enum: ['','3mois', '6mois', '9mois', '12mois']
     },
     classeNYHA: {
         type: String,
         enum: ['','recuperation_totale', 'recuperation_partielle', 'etat_stationnaire', 'degradation_qualite_vie']
     },
     detailsDeces: {
         presente: Boolean,
         date: String,
         causes: String,
         lieu: {
         type: String,
         enum: ['','hopital', 'domicile']
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
      dtdvg: String,
      dtsvg: String,
      fevg: String,
      fr: String, 
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
     }
   },

   enfant:{
      presente:Boolean,
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
   }
});


const Evolution = mongoose.model('Evolution', EvolutionSchema);
module.exports = Evolution;
