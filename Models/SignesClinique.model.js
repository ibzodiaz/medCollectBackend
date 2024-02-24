const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SignesCliniquesSchema = new Schema({
   patientId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
      required: true
   },
   consultationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultation',
      required:true
   },
   dyspneeEffort: {
      presente: {
         type: Boolean,
         required: true
      },
      typeNYHA: {
         type: String,
         enum: ['', 'Type I', 'Type II', 'Type III', 'Type IV'] // Ajout de la chaîne vide comme option
      }
   },
   oedemeAiguPoumon: {
      presente: {
         type: Boolean,
         required: true
      }
   },
   toux: {
      presente: {
         type: Boolean,
         required: true
      }
   },
   palpitations: {
      presente: {
         type: Boolean,
         required: true
      }
   },
   omi: {
      presente: {
         type: Boolean,
         required: true
      }
   },
   constantes: {
      ta: {
         systolique: Number,
         diastolique: Number
      },
      fc: Number,
      fr: Number,
      temperature: Number,
      poids: Number,
      taille: Number,
      imc: Number
   },
   souffleCardiaque: {
      presente: {
         type: Boolean,
         required: true
      },
      typeSouffle: {
         type: [String], // Définir le type comme un tableau de chaînes
         default: [],
         required: true,
         validate: {
             validator: function (value) {
                 // Assurez-vous que chaque élément du tableau est une chaîne valide
                 return value.every(val => ['IM', 'RM', 'IA', 'RA', 'IP', 'RP', 'IT', 'RP'].includes(val));
             },
             message: props => `${props.value} is not a valid typeSouffle value!`
         }
      }
   },
   tsvj: {
      presente: {
         type: Boolean,
         required: true
      }
   },
   hepatomegalie: {
      presente: {
         type: Boolean,
         required: true
      }
   }
});

const SignesCliniques = mongoose.model('SignesCliniques', SignesCliniquesSchema);
module.exports = SignesCliniques;
