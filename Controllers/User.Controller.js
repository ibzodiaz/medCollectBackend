const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require("../Models/User.model");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
                                        .populate('hopitalId')
                                        .exec();
        res.json({ data: users });
    } catch (err) {
        res.status(500).json({ message: 'Database Error', error: err });
    }
};

exports.getUser = async (req, res) => {
    const userId = req.params.id;

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing Parameter' });
    }

    try {
        // Récupération de l'utilisateur et vérification
        const user = await User.findById(userId)
                                                .populate('hopitalId')
                                                .exec();
        if (!user) {
            return res.status(404).json({ message: 'This user does not exist!' });
        }

        return res.json({ data: user });
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }
};

exports.getUsersByIdHopital = async (req, res) => {
    const hopitalId = req.params.hopitalId;

    // Vérification si le champ id est présent et cohérent
    if (!hopitalId) {
        return res.status(400).json({ message: 'Missing Parameter' });
    }

    try {
        // Récupération des utilisateurs ayant hopitalId égal à hopitalId
        const users = await User.find({ hopitalId: hopitalId })
                                .populate('hopitalId')
                                .exec();

        // Vérification si des utilisateurs ont été trouvés
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found for this hopitalId!' });
        }

        return res.json({ data: users });
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }
};


exports.addUser = async (req, res) => {
    const { nom, prenom, pseudo, email, password } = req.body;

    // Validation des données reçues
    if (!nom || !prenom || !pseudo || !email || !password) {
        return res.status(400).json({ message: 'Missing Data' });
    }

    try {
        // Vérification si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: `The user ${nom} already exists!` });
        }

        // Hashage du mot de passe utilisateur
        const hash = await bcrypt.hash(password.trim(), parseInt(process.env.BCRYPT_SALT_ROUND));
        req.body.password = hash;

        // Création de l'utilisateur
        const newUser = new User(req.body);
        await newUser.save();
        return res.json({ message: 'User Created', data: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Database Error', error: err.message });
    }
};

exports.updateUser = async (req, res) => {

    const { nom, prenom, pseudo, email, password } = req.body;

    // Validation des données reçues
    if (!nom || !prenom || !pseudo || !email || !password) {
        return res.status(400).json({ message: 'Missing Data' });
    }

    const userId = req.params.userId;

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        // Recherche de l'utilisateur et vérification
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'This user does not exist!' });
        }

        const hash = await bcrypt.hash(password.trim(), parseInt(process.env.BCRYPT_SALT_ROUND));
        req.body.password = hash;

        // Mise à jour de l'utilisateur
        await User.findByIdAndUpdate(userId, req.body);
        return res.json({ message: 'User Updated' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: 'Database Error', error: err });
    }
};


exports.untrashUser = async (req, res) => {
    const userId = req.params.id;

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await User.findByIdAndUpdate(userId, { deletedAt: null });
        res.status(204).json({});
    } catch (err) {
        res.status(500).json({ message: 'Database Error', error: err });
    }
};

exports.trashUser = async (req, res) => {
    const userId = req.params.id;

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await User.findByIdAndDelete(userId);
        res.status(204).json({});
    } catch (err) {
        res.status(500).json({ message: 'Database Error', error: err });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;

    // Vérification si le champ id est présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await User.findByIdAndDelete(userId);
        res.status(204).json({});
    } catch (err) {
        res.status(500).json({ message: 'Database Error', error: err });
    }
};

