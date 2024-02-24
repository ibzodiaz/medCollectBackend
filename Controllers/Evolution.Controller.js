const createError = require('http-errors');
const mongoose = require('mongoose');

const Evolution = require("../Models/Evolution.modal");

const ObjectId = mongoose.Types.ObjectId;

const getAllEvolution = async (req, res, next) => {

    try{    
        const result = await Evolution.find({},{__v:0});
        res.send(result);
    }catch(err){
        console.log(err.message);
    }
    
}

const getEvolutionById = async (req,res,next) => {

    try{    
        const id = req.params.id;
        const evolution = await Evolution.findById(id)
                                                    .populate('patientId')
                                                    .exec();
        if(!evolution){
            throw createError(404,'Evolution does not exist.');
        }
        res.send(evolution);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Evolution id'));
            return;
        }
        next(error);
    }
        
}

const getEvolutionOne = async (req, res, next) => {
    try {
        const patientId = new ObjectId(req.params.patientId);
        const consultationId = new ObjectId(req.params.consultationId);

        const evolution = await Evolution.findOne({ patientId, consultationId })
            .populate('patientId')
            .populate('consultationId')
            .exec();

        if (!evolution) {
            throw createError(404, 'Evolution does not exist.');
        }

        res.send(evolution);
    } catch (error) {
        console.error(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Evolution id'));
            return;
        }
        next(error);
    }
}


const createNewEvolution = async (req, res, next) => {

    try{
        const evolution = new Evolution(req.body);
        const result = await evolution.save();
        res.send(result);
    }catch(error){
        console.log(error.message);
        if(error.name === "ValidationError"){
            next(createError(422,error.message));
            return;
        }
        next(error);
    }
}


const updateEvolution = async (req, res, next) => {
    try{    
        const patientId = req.params.patientId;
        const consultationId = req.params.consultationId;
        const updates = req.body;
        const options = {new:true};
        const evolution = await Evolution.findOneAndUpdate({patientId,consultationId},updates,options);
        if(!evolution){
            throw createError(404,'Evolution does not exist.');
        }
        res.send(evolution);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Evolution id'));
            return;
        }
        next(error);
    }
}

const deleteEvolution = async (req, res, next) => {
    try{    
        const patientId = req.params.patientId;
        const consultationId = req.params.consultationId;

        const evolution = await Evolution.findOneAndDelete({patientId,consultationId});
        if(!evolution){
            throw createError(404,'Evolution does not exist.');
        }
        res.send(evolution);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Evolution id'));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllEvolution, 
    getEvolutionById,
    getEvolutionOne,
    createNewEvolution,
    updateEvolution,
    deleteEvolution
};