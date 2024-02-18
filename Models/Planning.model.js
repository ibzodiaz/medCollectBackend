const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlanningSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        required:true
    },
    hourStart: {
        type: String,
        required:true
    },
    hourEnd: {
        type: String,
        required:true
    }
});

const Planning = mongoose.model('Planning', PlanningSchema);
module.exports = Planning;
