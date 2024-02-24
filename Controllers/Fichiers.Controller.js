const createError = require('http-errors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Définition de la configuration de Multer pour l'upload de fichiers
const upload = multer({ dest: 'uploads/' }); // Dossier où les fichiers seront sauvegardés

const Fichiers = require("../Models/Fichiers.model");

const ObjectId = mongoose.Types.ObjectId;

const getAllFichiers = async (req, res, next) => {

    try{    
        const result = await Fichiers.find({},{__v:0});
        res.send(result);
    }catch(err){
        console.log(err.message);
    }
    
}

const getFichiersById = async (req,res,next) => {

    try{    
        const id = req.params.id;
        const fichiers = await Fichiers.findById(id)
                                                    .populate('patientId')
                                                    .exec();
        if(!fichiers){
            throw createError(404,'Fichiers does not exist.');
        }
        res.send(fichiers);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Fichiers id'));
            return;
        }
        next(error);
    }
        
}

const getFichiersPatient = async (req, res, next) => {
    try {
        const patientId = new ObjectId(req.params.patientId);

        const fichiers = await Fichiers.find({ patientId })
            .populate('patientId')
            .exec();

        if (!fichiers) {
            throw createError(404, 'Fichiers does not exist.');
        }

        res.send(fichiers);
    } catch (error) {
        console.error(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Fichiers id'));
            return;
        }
        next(error);
    }
}


const createNewFichiers = async (req, res, next) => {
    try {
        // Si un fichier a été uploadé
        if (req.file) {
            // Récupérer le chemin du fichier uploadé
            const filePath = req.file.path;
            // Enregistrer le chemin du fichier dans la base de données
            req.body.filePath = filePath;
        }

        // Créer une instance de modèle avec les données reçues
        const fichiers = new Fichiers(req.body);

        // Enregistrer l'instance dans la base de données
        const result = await fichiers.save();
        
        // Envoyer la réponse
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



const updateFichiers = async (req, res, next) => {
    try{    
        const id = req.params.id;
        const updates = req.body;
        const options = {new:true};
        const fichiers = await Fichiers.findByIdAndUpdate({id},updates,options);
        if(!fichiers){
            throw createError(404,'Fichiers does not exist.');
        }
        res.send(fichiers);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Fichiers id'));
            return;
        }
        next(error);
    }
}

const deleteFichiers = async (req, res, next) => {
    try{    
        const id = req.params.id;
        const fichiers = await Fichiers.findByIdAndDelete({id});
        if(!fichiers){
            throw createError(404,'Fichiers does not exist.');
        }
        res.send(fichiers);
    }catch(error){
        console.log(error.message);
        if(error instanceof mongoose.CastError){
            next(createError(400,'Invalid Fichiers id'));
            return;
        }
        next(error);
    }
}

module.exports = {
    getAllFichiers, 
    getFichiersById,
    getFichiersPatient,
    createNewFichiers,
    updateFichiers,
    deleteFichiers,
    upload
};