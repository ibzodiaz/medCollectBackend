const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AntecedentSchema = new Schema({
   patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
   },
   htaGravidique: Boolean,
   diabete_gestionnelle: Boolean,
   pre_eclampsie: Boolean,
   autres: String,

   menarche: Number,
   gestite: Number,
   parite: Number,
   grossessesGemellaires: Boolean,
   tocolyseProlongee: String,

   atcdDecompensation: Boolean,
   nombreAtcdDecompensation: Number,
   typeInsuffisanceCardiaque: {
      type: String,
      enum: ['','IVG', 'IVD', 'ICG']
   },
 
   hospitalisationsAnterieures: Boolean,
   nombreHospitalisations: Number
});

const Antecedent = mongoose.model('Antecedent', AntecedentSchema);
module.exports = Antecedent;
