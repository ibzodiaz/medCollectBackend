const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// SIGNES PARACLINIQUES
const SignesParacliniquesSchema = new Schema({
   patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
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
         required: true
      },
      indexCardiothoracique: Number
   },
   autresSignes: String,
   ecg: {
      presente: {
         type: Boolean,
         required: true
      },
      rythmeCardiaque: {
         type: String,
         enum: ['Sinusal', 'Tachycardie', 'Troubles conductifs', 'HAG', 'HVG', 'HAD', 'HVD', 'FA', 'fa', 'Autres']
      }
   },
   ett: {
      presente: {
         type: Boolean,
         required: true
      },
      dtdvg: String,
      dtsvg: String,
      fevg: String,
      dtog: String,
      ntProBNP: Boolean,
      prolactine: Boolean
   },
   epanchementPericardique: {
      presente: {
         type: Boolean,
         required: true
      }
   },
   fuiteValvulaire: {
      presente: {
         type: Boolean,
         required: true
      },
      typeFuite: {
         type: String,
         enum: ['Absente', 'Aortique', 'Mitrale', 'Tricuspidienne', 'Pulmonaire']
      }
   },
   stenoseValvulaire: {
      presente: {
         type: Boolean,
         required: true
      },
      typeStenose: {
         type: String,
         enum: ['Absente', 'Aortique', 'Mitrale', 'Tricuspidienne', 'Pulmonaire']
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
      autres: Boolean
   },
   modaliteEvolutiveHospitalisation: {
      type: String,
      enum: ['Favorable', 'Défavorable']
   },
   aspectsDefavorables: {
      complications: Boolean,
      deces: Boolean
   },
   typeComplications: {
      type: [String],
      enum: ['AVC', 'IVG', 'IVD', 'ICG', 'TDR', 'TDC', 'Pericardite', 'Insuffisance coronarienne', 'Acc. Embolique', 'Nephropathie', 'Abces splenique', 'Autre', 'Arthropathie']
   },
   delaiDeces: Number,
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
      infectionsViralesOuBacteriennes: Boolean,
      denutrition: Boolean,
      rupturesTherapeutiques: Boolean
   },
   analyses: {
      nfs: Boolean,
      uree: Boolean,
      creatininemie: Boolean
   },
   echocardiographie: {
      e: String,
      a: String,
      td: String,
      ee: String,
      tapse: String
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

const SignesParacliniques = mongoose.model('SignesParacliniques', SignesParacliniquesSchema);
module.exports = SignesParacliniques;
