const createError = require('http-errors');
const mongoose = require('mongoose');

const Consultation = require("../Models/Consultation.model");

const ObjectId = mongoose.Types.ObjectId;

const getAllConsultation = async (req, res, next) => {

    try{    
        const result = await Consultation.find({},{__v:0});
        res.send(result);
    }catch(err){
        console.log(err.message);
    }
    
}

const getConsultationById = async (req,res,next) => {

    try{    
        const id = req.params.id;
        const consultation = await Consultation.findById(id)
                                                    .populate('patientId')
                                                    .exec();
        if(!consultation){
            throw createError(404,'Consultation does not exist.');
        }
        res.send(consultation);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Consultation id'));
            return;
        }
        next(error);
    }
        
}

const getConsultationPatient = async (req, res, next) => {
    try {
        const patientId = new ObjectId(req.params.patientId);

        const consultation = await Consultation.find({ patientId })
            .populate('patientId')
            .exec();

        if (!consultation) {
            throw createError(404, 'Consultation does not exist.');
        }

        res.send(consultation);
    } catch (error) {
        console.error(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Consultation id'));
            return;
        }
        next(error);
    }
}


const createNewConsultation = async (req, res, next) => {

    try{
        const consultation = new Consultation(req.body);
        const result = await consultation.save();
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


const updateConsultation = async (req, res, next) => {
    try{    
        const id = req.params.id;
        const updates = req.body;
        const options = {new:true};
        const consultation = await Consultation.findByIdAndUpdate(id,updates,options);
        if(!consultation){
            throw createError(404,'Consultation does not exist.');
        }
        res.send(consultation);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Consultation id'));
            return;
        }
        next(error);
    }
}

const deleteConsultation = async (req, res, next) => {
    try{    
        const id = req.params.id;
        const consultation = await Consultation.findByIdAndDelete({id});
        if(!consultation){
            throw createError(404,'Consultation does not exist.');
        }
        res.send(consultation);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Consultation id'));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllConsultation, 
    getConsultationById,
    getConsultationPatient,
    createNewConsultation,
    updateConsultation,
    deleteConsultation
};