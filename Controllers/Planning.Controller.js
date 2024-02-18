const createError = require('http-errors');
const mongoose = require('mongoose');
const Planning = require("../Models/Planning.model");

const ObjectId = mongoose.Types.ObjectId;

const getAllPlanning = async (req, res, next) => {

    try{    
        const result = await Planning.find();
        res.send(result);
    }catch(error){
        console.log(error.message);
        next(error);
    }
    
}


const getPlanningById = async (req, res, next) => {
    try {    
        const id = new ObjectId(req.params.id);

        const planning = await Planning.findById(id);
        if (!planning) {
            throw createError(404, 'Planning does not exist.');
        }
        res.send(Planning);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Planning id'));
            return;
        }
        next(error);
    }
}

const getPlanningByUserId = async (req, res, next) => {
    try {
        const userId = new ObjectId(req.params.userId);

        const planning = await Planning.find({ userId })
            .populate('userId')
            .exec();

        if (!planning) {
            throw createError(404, 'Planning does not exist.');
        }

        res.send(planning);
    } catch (error) {
        console.error(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Planning id'));
            return;
        }
        next(error);
    }
}

const createNewPlanning = async (req, res, next) => {
    try {
        const planning = new Planning(req.body);
        const result = await planning.save();
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

const updatePlanning = async (req, res, next) => {
    try {    
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };
        const planning = await Planning.findByIdAndUpdate(id, updates, options);
        if (!planning) {
            throw createError(404, 'Planning does not exist.');
        }
        res.send(planning);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Planning id'));
            return;
        }
        next(error);
    }
}

const deletePlanning = async (req, res, next) => {
    try {    
        const id = req.params.id;
        const planning = await Planning.findByIdAndDelete(id);
        if (!planning) {
            throw createError(404, 'Planning does not exist.');
        }
        res.send(planning);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Planning id'));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllPlanning,
    getPlanningById,
    getPlanningByUserId,
    createNewPlanning,
    updatePlanning,
    deletePlanning
};
