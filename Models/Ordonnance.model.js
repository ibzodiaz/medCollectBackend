const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrdonnanceSchema = new Schema({
    posologie: {
        type: String,
        required: true
    },
    medicament: {
        type: String,
        required: true
    }
},{timestamps:true});

const Ordonnance = mongoose.model('Ordonnance', OrdonnanceSchema);
module.exports = Ordonnance;
