const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HopitalSchema = new Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   Nom: String,
   Lieu: String
});

const Hopital = mongoose.model('Hopital', HopitalSchema);
module.exports = Hopital;
