const createError = require('http-errors');
const mongoose = require('mongoose');
const Hopital = require("../Models/Hopital.model");

const ObjectId = mongoose.Types.ObjectId;

const getAllHopital = async (req, res, next) => {

    try{    
        const result = await Hopital.find()
                                            .populate('userId')
                                            .exec();
        res.send(result);
    }catch(error){
        console.log(error.message);
        next(error);
    }
    
}


const getHopitalById = async (req, res, next) => {
    try {
        const id = new ObjectId(req.params.id);

        const hopital = await Hopital.findById(id)
                                                    .populate('userId')
                                                    .exec();

        if (!hopital) {
            throw createError(404, 'Hopital does not exist.');
        }

        res.send(hopital);
    } catch (error) {
        console.error(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Hopital id'));
            return;
        }
        next(error);
    }
}

const createNewHopital = async (req, res, next) => {
    try {
        const hopital = new Hopital(req.body);
        const result = await hopital.save();
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

const updateHopital = async (req, res, next) => {
    try {    
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };
        const hopital = await Hopital.findByIdAndUpdate(id, updates, options); 
        if (!hopital) {
            throw createError(404, 'Hopital does not exist.');
        }
        res.send(hopital);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Hopital id'));
            return;
        }
        next(error);
    }
}

const deleteHopital = async (req, res, next) => {
    try {    
        const id = req.params.id;
        const hopital = await Hopital.findByIdAndDelete(id);
        if (!hopital) {
            throw createError(404, 'Hopital does not exist.');
        }
        res.send(Hopital);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Hopital id'));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllHopital,
    getHopitalById,
    createNewHopital,
    updateHopital,
    deleteHopital
};
