const createError = require('http-errors');
const mongoose = require('mongoose');
const Meetings = require("../Models/Meetings.model");

const ObjectId = mongoose.Types.ObjectId;

const getAllMeetings = async (req, res, next) => {

    try{    
        const result = await Meetings.find();
        res.send(result);
    }catch(error){
        console.log(error.message);
        next(error);
    }
    
}


const getMeetingsByUserId = async (req, res, next) => {
    try {
        const userId = new ObjectId(req.params.userId);

        const meetings = await Meetings.find({ userId })
            .populate('userId')
            .exec();

        if (!meetings) {
            throw createError(404, 'Meetings does not exist.');
        }

        res.send(meetings);
    } catch (error) {
        console.error(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Meetings id'));
            return;
        }
        next(error);
    }
}

const getMeetingsByHospitalId = async (req, res, next) => {
    try {
        const hospitalId = new ObjectId(req.params.hospitalId);

        const meetings = await Meetings.find({ hospitalId });

        if (!meetings) {
            throw createError(404, 'Meetings does not exist.');
        }

        res.send(meetings);
    } catch (error) {
        console.error(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Meetings id'));
            return;
        }
        next(error);
    }
}

const createNewMeetings = async (req, res, next) => {
    try {
        const meetings = new Meetings(req.body);
        const result = await meetings.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if (error.name === "ValidationError") {
            next(createError(422, error.message));
            return;
        }
        next(error);
    }
}

const updateMeetings = async (req, res, next) => {
    try {    
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };
        const meetings = await Meetings.findByIdAndUpdate(id, updates, options); 
        if (!meetings) {
            throw createError(404, 'Meetings does not exist.');
        }
        res.send(meetings);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Meetings id'));
            return;
        }
        next(error);
    }
}

const deleteMeetings = async (req, res, next) => {
    try {    
        const id = req.params.id;
        const meetings = await Meetings.findByIdAndDelete(id);
        if (!meetings) {
            throw createError(404, 'Meetings does not exist.');
        }
        res.send(meetings);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Meetings id'));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllMeetings,
    getMeetingsByUserId,
    getMeetingsByHospitalId,
    createNewMeetings,
    updateMeetings,
    deleteMeetings
};
