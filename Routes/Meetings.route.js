const express = require('express');
const router = express.Router(); // Ajoutez cette ligne pour créer un objet router

const MeetingsController = require('../Controllers/Meetings.Controller');

router.get('/', MeetingsController.getAllMeetings);
router.post('/', MeetingsController.createNewMeetings);
//router.get('/:id', MeetingsController.getMeetingsById);
router.get('/meetingbyhospital/:hospitalId',MeetingsController.getMeetingsByHospitalId);
router.get('/:userId', MeetingsController.getMeetingsByUserId);
router.patch('/:id', MeetingsController.updateMeetings);
router.delete('/:id', MeetingsController.deleteMeetings);

module.exports = router;
