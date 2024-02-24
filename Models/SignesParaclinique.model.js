const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// SIGNES PARACLINIQUES
const SignesParacliniquesSchema = new Schema({
   patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient'
   },
   consultationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultation',
      required:true
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
   telecoeur: {
      presente: {
         type: Boolean,
      },
      indexCardiothoracique: Number,
      autresSignes: String
   },
   ecg: {
      presente: {
         type: Boolean,
      },
      rythmeCardiaque: {
         type: [String],
         default: [],
         required: true,
         validate: {
             validator: function (value) {
                 // Assurez-vous que chaque élément du tableau est une chaîne valide
                 return value.every(val => ['Sinusal', 'Tachycardie', 'Troubles conductifs', 'HAG', 'HVG', 'HAD', 'HVD', 'FA', 'fa'].includes(val));
             },
             message: props => `${props.value} is not a valid typeSouffle value!`
         }
      },
      autres:{
         type:String
      }
   },
   ett: {
      presente: {
         type: Boolean,
      },
      dtdvg: String,
      dtsvg: String,
      fevg: String,
      epanchementPericardique: {
         presente: {
            type: Boolean,
         }
      },
      fuiteValvulaire: {
         presente: {
            type: Boolean,
         },
         typeFuite: {
            type: [String],
            default: [],
            required: true,
            validate: {
                validator: function (value) {
                    // Assurez-vous que chaque élément du tableau est une chaîne valide
                    return value.every(val => ['Absente', 'Aortique', 'Mitrale', 'Tricuspidienne', 'Pulmonaire'].includes(val));
                },
                message: props => `${props.value} is not a valid typeFuite value!`
            }
         }
      },
      stenoseValvulaire: {
         presente: {
            type: Boolean,
         },
         typeStenose: {
            type: [String],
            default: [],
            required: true,
            validate: {
                validator: function (value) {
                    // Assurez-vous que chaque élément du tableau est une chaîne valide
                    return value.every(val => ['Absente', 'Aortique', 'Mitrale', 'Tricuspidienne', 'Pulmonaire'].includes(val));
                },
                message: props => `${props.value} is not a valid typeFuite value!`
            }
         }
      }
   },
   traitement: {
      diuretique: Boolean,
      iec: Boolean,
      tonicardiaque: Boolean,
      bromocriptine: Boolean,
      anticoagulants: Boolean,
      betabloquants: Boolean,
      contraception: Boolean,
      autres: String
   },
   modaliteEvolutiveHospitalisation: {
      presente: Boolean,
      aspectsDefavorables: {
         complications: Boolean,
         deces: Boolean
      },
      typeComplications: {
         type: [String],
         enum: ['AVC', 'IVG', 'IVD', 'ICG', 'TDR', 'TDC', 'Pericardite', 'Insuffisance coronarienne', 'Acc. Embolique', 'Nephropathie', 'Abces splenique', 'Autre', 'Arthropathie']
      },
      autres: String,
      delaiDeces: Number
   }
});

const SignesParacliniques = mongoose.model('SignesParacliniques', SignesParacliniquesSchema);
module.exports = SignesParacliniques;
