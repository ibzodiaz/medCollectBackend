const createError = require('http-errors');
const mongoose = require('mongoose');

const Patient = require("../Models/Patient.model");
const Antecedent = require("../Models/Antecedent.model");
const SignesCliniques = require("../Models/SignesClinique.model");
const SignesParaCliniques = require("../Models/SignesParaclinique.model");

const getAllPatients = async (req, res, next) => {

    try{    
        const result = await Patient.find();
        res.send(result);
    }catch(err){
        console.log(err.message);
    }
    
}

const getPatientById = async (req,res,next) => {

    try{    
        const id = req.params.id;
        const patient = await Patient.findById(id);
        if(!patient){
            throw createError(404,'Patient does not exist.');
        }
        res.send(patient);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid patient id'));
            return;
        }
        next(error);
    }
        
}

const createNewPatient = async (req, res, next) => {

    try{
        const patient = new Patient(req.body);
        const result = await patient.save();
        res.send(result);
    }catch(error){
        console.log(error.message);
        if(error.name === "ValidationError"){
            next(createError(422,error.message));
            return;
        }
        next(error);
    }

    /*const product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product
    .save()
    .then(result=>{
        console.log(result);
        res.send(result);
    }).catch(err=>{
        console.log(err);
    })*/
}


const updatePatient = async (req, res, next) => {
    try{    
        const id = req.params.id;
        const updates = req.body;
        const options = {new:true};
        const patient = await Patient.findByIdAndUpdate(id,updates,options);
        if(!patient){
            throw createError(404,'Patient does not exist.');
        }
        res.send(patient);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid patient id'));
            return;
        }
        next(error);
    }
}

const deletePatient = async (req, res, next) => {
    try{    
        const id = req.params.id;
        const patient = await Patient.findByIdAndDelete(id);
        if(!patient){
            throw createError(404,'Patient does not exist.');
        }
        res.send(patient);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid patient id'));
            return;
        }
        next(error);
    }
}

const deletePatientWithLinks = async (req, res, next) => {
    const patientId = req.params.patientId;

    try {
        // Commencez une session MongoDB pour effectuer une transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            await Antecedent.deleteMany({ patientId: patientId });

            await SignesCliniques.deleteMany({ patientId: patientId });

            await SignesParaCliniques.deleteMany({ patientId: patientId });

            await Patient.findByIdAndDelete(patientId);

            // Validez la transaction
            await session.commitTransaction();
            session.endSession();

            res.send("Patient avec ses liens supprimés avec succès.");
            
        } catch (error) {
            // Annulez la transaction en cas d'erreur
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du patient et de ses antécédents.' });
    }
};

module.exports = {
    getAllPatients, 
    getPatientById,
    createNewPatient,
    updatePatient,
    deletePatient,
    deletePatientWithLinks
};