const createError = require('http-errors');
const mongoose = require('mongoose');

const SignesCliniques = require("../Models/SignesClinique.model");

const ObjectId = mongoose.Types.ObjectId;

const getAllSignesCliniques = async (req, res, next) => {

    try{    
        const result = await SignesCliniques.find({},{__v:0});
        res.send(result);
    }catch(err){
        console.log(err.message);
    }
    
}

const getSignesCliniquesById = async (req,res,next) => {

    try{    
        const id = new ObjectId(req.params.id);
        
        const signesCliniques = await SignesCliniques.findById(id)
                                                    .populate('patientId')
                                                    .exec();
        if(!signesCliniques){
            throw createError(404,'SignesCliniques does not exist.');
        }
        res.send(signesCliniques);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid SignesCliniques id'));
            return;
        }
        next(error);
    }
        
}

const getSignesCliniquesOne = async (req, res, next) => {
    try {
        const patientId = new ObjectId(req.params.patientId);
        const consultationId = new ObjectId(req.params.consultationId);

        const signesCliniques = await SignesCliniques.findOne({ patientId,consultationId })
            .populate('patientId')
            .populate('consultationId')
            .exec();

        if (!signesCliniques) {
            throw createError(404, 'SignesCliniques does not exist.');
        }

        res.send(signesCliniques);
    } catch (error) {
        console.error(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid SignesCliniques id'));
            return;
        }
        next(error);
    }
}


const createNewSignesCliniques = async (req, res, next) => {

    try{
        const signesCliniques = new SignesCliniques(req.body);
        const result = await signesCliniques.save();
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


const updateSignesCliniques = async (req, res, next) => {
    try{    
        const patientId = req.params.patientId;
        const consultationId = req.params.consultationId;
        const updates = req.body;
        const options = {new:true};
        const signesCliniques = await SignesCliniques.findOneAndUpdate({ patientId,consultationId },updates,options);
        if(!signesCliniques){
            throw createError(404,'SignesCliniques does not exist.');
        }
        res.send(signesCliniques);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid SignesCliniques id'));
            return;
        }
        next(error);
    }
}

const deleteSignesCliniques = async (req, res, next) => {
    try{    
        const patientId = req.params.patientId;
        const consultationId = req.params.consultationId;
        
        const signesCliniques = await SignesCliniques.findOneAndDelete({ patientId,consultationId });
        if(!signesCliniques){
            throw createError(404,'SignesCliniques does not exist.');
        }
        res.send(signesCliniques);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid SignesCliniques id'));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllSignesCliniques, 
    getSignesCliniquesById,
    createNewSignesCliniques,
    updateSignesCliniques,
    deleteSignesCliniques,
    getSignesCliniquesOne
};