/***********************************/
/*** Import des module nécessaires */

const jwt = require('jsonwebtoken');

const User = require("../Models/User.model");

/**********************************/
/*** Routage de la ressource Auth */

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validation des données reçues
    if (!email || !password) {
        return res.status(400).json({ message: 'Bad email or password' });
    }

    try {
        // Vérification si l'utilisateur existe
        let user = await User.findOne({ email: email });
        console.log("user: "+user)
        if (!user) {
            return res.status(401).json({ message: 'This account does not exist!' });
        }


        // Vérification du mot de passe
        let isPasswordValid = await user.checkPassword(password,user.password);

        console.log(isPasswordValid);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        // Génération du token et envoi
        const token = jwt.sign({
            id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            hospital:user.hopitalId._id
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING });
        console.log(token);

        return res.json({ access_token: token });

    } catch (err) {
        console.error('MongoDB Error:', err);
        res.status(500).json({ message: 'Login process failed', error: err.message });
    }
};
