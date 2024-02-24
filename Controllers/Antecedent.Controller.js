const createError = require('http-errors');
const mongoose = require('mongoose');
const Antecedent = require("../Models/Antecedent.model");

const ObjectId = mongoose.Types.ObjectId;

const getAllAntecedent = async (req, res, next) => {

    try{    
        const result = await Patient.find();
        res.send(result);
    }catch(error){
        console.log(error.message);
        next(error);
    }
    
}


const getAntecedentById = async (req, res, next) => {
    try {    
        const id = new ObjectId(req.params.id);

        const antecedent = await Antecedent.findById(id)
                                //.populate({path:'patientId',select:['medicaux','gynecoObstetricaux']})
                                .populate('patientId')
                                .exec();
        if (!antecedent) {
            throw createError(404, 'Antecedent does not exist.');
        }
        res.send(antecedent);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid antecedent id'));
            return;
        }
        next(error);
    }
}

const getAntecedentOne = async (req, res, next) => {
    try {
        const patientId = new ObjectId(req.params.patientId);
        //const consultationId = new ObjectId(req.params.consultationId);

        const antecedent = await Antecedent.findOne({ patientId })
            .populate('patientId')
            .exec();

        if (!antecedent) {
            throw createError(404, 'Antecedent does not exist.');
        }

        res.send(antecedent);
    } catch (error) {
        console.error(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Antecedent id'));
            return;
        }
        next(error);
    }
}

const createNewAntecedent = async (req, res, next) => {
    try {
        const antecedent = new Antecedent(req.body);
        const result = await antecedent.save();
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

const updateAntecedent = async (req, res, next) => {
    try {    
        const patientId = req.params.patientId;
        //const consultationId = req.params.consultationId;

        const updates = req.body;
        const options = { new: true };
        const antecedent = await Antecedent.findOneAndUpdate({ patientId }, updates, options);
        if (!antecedent) {
            throw createError(404, 'Antecedent does not exist.');
        }
        res.send(antecedent);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid antecedent id'));
            return;
        }
        next(error);
    }
}

const deleteAntecedent = async (req, res, next) => {
    try {    
        const patientId = req.params.patientId;
        //const consultationId = req.params.consultationId;
        
        const antecedent = await Antecedent.findOneAndDelete({ patientId });
        if (!antecedent) {
            throw createError(404, 'Antecedent does not exist.');
        }
        res.send(antecedent);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid antecedent id'));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllAntecedent,
    getAntecedentById,
    getAntecedentOne,
    createNewAntecedent,
    updateAntecedent,
    deleteAntecedent
};
