const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Définition du schéma User
const userSchema = new mongoose.Schema({
    hopitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hopital',
        required: true
    },
    nom: {
        type: String,
        default: '',
        required: true
    },
    prenom: {
        type: String,
        default: '',
        required: true
    },
    pseudo: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        validate: {
            validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Email format is invalid'
        }
    },
    password: {
        type: String,
        validate: {
            validator: (value) => /^\$2a\$10\$.{53}$/.test(value),
            message: 'Password format is invalid',
        },
    },
    service: {
        type: String,
    },
    speciality: {
        type: String,
    },
    status:{
        type: String,
        enum:['A','D'],
        required:true
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true });


userSchema.methods.checkPassword = async function (password,passwordhashed) {
    return await bcrypt.compare(password.trim(), passwordhashed.trim());
};


const User = mongoose.model('User', userSchema);

module.exports = User;
