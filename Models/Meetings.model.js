const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
   patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
   },
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
   },
   hospitalId:{
      type: mongoose.Schema.ObjectId,
      ref: 'Hopital',
      required: true
   },
   date: String,
   hourStart: String,
   hourEnd: String,
   subject: String
});

const Meetings = mongoose.model('Meetings', MeetingSchema);
module.exports = Meetings;
