const createError = require('http-errors');
const mongoose = require('mongoose');

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


const getFichiersPatient = async (req, res, next) => {
    try {
        const patientId = new ObjectId(req.params.patientId);
        const userId = new ObjectId(req.params.userId);

        const fichiers = await Fichiers.find({ patientId,userId })
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
        if (req.files && req.files.file) {
            // Récupérer le chemin temporaire du fichier uploadé
            const filePath = req.files.file.tempFilePath;
            // Renommer et déplacer le fichier vers le dossier de destination
            const fileName = req.body.fileName;
            req.files.file.mv("./public/data/" + fileName, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Erreur lors de l\'enregistrement du fichier.');
                }
            });
            // Ajouter le chemin du fichier à req.body
            //req.body.filePath = 'data/' + fileName;
        }
        //console.log(req.files)
        // console.log("********************************")
        // console.log(req.body)
        
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
};



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
    getFichiersPatient,
    createNewFichiers,
    updateFichiers,
    deleteFichiers
};