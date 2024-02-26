const createError = require('http-errors');
const mongoose = require('mongoose');

const Prescription = require("../Models/Prescription.model");

const ObjectId = mongoose.Types.ObjectId;


const getPrescriptionByPatient = async (req,res,next) => {

    try{    
 
        const patientId = req.params.patientId;
        const consultationId = req.params.consultationId;

        const prescription = await Prescription.find({patientId,consultationId})
                                                    .populate('patientId')
                                                    .populate('consultationId')
                                                    .exec();
        if(!prescription){
            throw createError(404,'Prescription does not exist.');
        }
        res.send(prescription);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Prescription id'));
            return;
        }
        next(error);
    }
        
}


const createNewPrescription = async (req, res, next) => {

    try{
        const prescription = new Prescription(req.body);
        const result = await prescription.save();
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


const updatePrescription = async (req, res, next) => {
    try{    
        const id = req.params.id;

        const updates = req.body;
        const options = {new:true};
        const prescription = await Prescription.findOneAndUpdate({id},updates,options);
        if(!prescription){
            throw createError(404,'Prescription does not exist.');
        }
        res.send(prescription);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Prescription id'));
            return;
        }
        next(error);
    }
}

const deletePrescription = async (req, res, next) => {
    try{    
        const id = req.params.id;
        const prescription = await Prescription.findByIdAndDelete(id);
        if(!prescription){
            throw createError(404,'Prescription does not exist.');
        }
        res.send(prescription);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Prescription id'));
            return;
        }
        next(error);
    }
}

const deletePrescriptionByConsultation = async (req, res, next) => {
    try{
        const patientId = req.params.patientId;    
        const consultationId = req.params.consultationId;
        const prescription = await Prescription.deleteMany({patientId,consultationId});
        if(!prescription){
            throw createError(404,'Prescription does not exist.');
        }
        res.send(prescription);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Prescription id'));
            return;
        }
        next(error);
    }
}

module.exports = {
    getPrescriptionByPatient,
    createNewPrescription,
    updatePrescription,
    deletePrescription,
    deletePrescriptionByConsultation
};