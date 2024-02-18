const createError = require('http-errors');
const mongoose = require('mongoose');

const SignesParacliniques = require("../Models/SignesParaclinique.model");

const ObjectId = mongoose.Types.ObjectId;

const getAllSignesParacliniques = async (req, res, next) => {

    try{    
        const result = await SignesParacliniques.find({},{__v:0});
        res.send(result);
    }catch(err){
        console.log(err.message);
    }
    
}

const getSignesParacliniquesById = async (req,res,next) => {

    try{    
        const id = req.params.id;
        const signesParacliniques = await SignesParacliniques.findById(id)
                                                            .populate('patientId')
                                                            .exec();
        if(!signesParacliniques){
            throw createError(404,'SignesParacliniques does not exist.');
        }
        res.send(signesParacliniques);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid SignesParacliniques id'));
            return;
        }
        next(error);
    }
        
}

const getSignesParacliniquesOne = async (req, res, next) => {
    try {
        const patientId = new ObjectId(req.params.patientId);

        const signesParacliniques = await SignesParacliniques.findOne({ patientId })
            .populate('patientId')
            .exec();

        if (!signesParacliniques) {
            throw createError(404, 'SignesParacliniques does not exist.');
        }

        res.send(signesParacliniques);
    } catch (error) {
        console.error(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid SignesParacliniques id'));
            return;
        }
        next(error);
    }
}


const createNewSignesParacliniques = async (req, res, next) => {

    try{
        const signesParacliniques = new SignesParacliniques(req.body);
        const result = await signesParacliniques.save();
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


const updateSignesParacliniques = async (req, res, next) => {
    try{    
        const id = req.params.id;
        const updates = req.body;
        const options = {new:true};
        const signesParacliniques = await SignesParacliniques.findByIdAndUpdate(id,updates,options);
        if(!signesParacliniques){
            throw createError(404,'SignesParacliniques does not exist.');
        }
        res.send(signesParacliniques);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid SignesParacliniques id'));
            return;
        }
        next(error);
    }
}

const deleteSignesParacliniques = async (req, res, next) => {
    try{    
        const id = req.params.id;
        const signesParacliniques = await SignesParacliniques.findByIdAndDelete(id);
        if(!signesParacliniques){
            throw createError(404,'SignesParacliniques does not exist.');
        }
        res.send(signesParacliniques);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid SignesParacliniques id'));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllSignesParacliniques, 
    getSignesParacliniquesById,
    getSignesParacliniquesOne,
    createNewSignesParacliniques,
    updateSignesParacliniques,
    deleteSignesParacliniques
};