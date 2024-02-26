const createError = require('http-errors');
const mongoose = require('mongoose');

const Ordonnance = require("../Models/Ordonnance.model");

const ObjectId = mongoose.Types.ObjectId;

const getAllOrdonnance = async (req, res, next) => {

    try{    
        const result = await Ordonnance.find({},{__v:0});
        res.send(result);
    }catch(err){
        console.log(err.message);
    }
    
}

const getOrdonnanceById = async (req,res,next) => {

    try{    
        const id = req.params.id;
        const ordonnance = await Ordonnance.findById(id);

        if(!ordonnance){
            throw createError(404,'Ordonnance does not exist.');
        }
        res.send(ordonnance);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Ordonnance id'));
            return;
        }
        next(error);
    }
        
}


const createNewOrdonnance = async (req, res, next) => {

    try{
        const ordonnance = new Ordonnance(req.body);
        const result = await ordonnance.save();
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


const updateOrdonnance = async (req, res, next) => {
    try{    
        const id = req.params.id;
        const updates = req.body;
        const options = {new:true};
        const ordonnance = await Ordonnance.findByIdAndUpdate({id},updates,options);
        if(!ordonnance){
            throw createError(404,'Ordonnance does not exist.');
        }
        res.send(ordonnance);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Ordonnance id'));
            return;
        }
        next(error);
    }
}

const deleteOrdonnance = async (req, res, next) => {
    try{    
        const id = req.params.id;
        const ordonnance = await Ordonnance.findByIdAndDelete(id);
        if(!ordonnance){
            throw createError(404,'Ordonnance does not exist.');
        }
        res.send(ordonnance);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Ordonnance id'));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllOrdonnance, 
    getOrdonnanceById,
    createNewOrdonnance,
    updateOrdonnance,
    deleteOrdonnance
};