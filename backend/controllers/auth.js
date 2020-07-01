require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const passwordValidator = require('../middleware/passwordValidator');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
    let isValid = true;
    let message = '';

    if (!emailValidator.validate(req.body.email)) {
        isValid = false;
        message = "Veuillez renseigner une adresse email correcte.";
    } 
    if (!passwordValidator.validate(req.body.password)) {
        isValid = false;
        message = "Le mot de passe doit comporter au moins 8 caractères, dont au moins 1 minuscule, 1 majuscule et 1 chiffre.";
    } 
    if (!emailValidator.validate(req.body.email) && !passwordValidator.validate(req.body.password)) {
        isValid = false;
        message = "Veuillez renseigner des identifiants de connexion corrects."
    }

    if (!isValid) {
        res.status(403).json({ message: message });
    } else {
        await 
        bcrypt.hash(req.params.password, 10)
        .then(hash => {
            User.create({
                email: req.params.email,
                username: req.params.username,
                password: hash
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            })
        })
        .catch(error => res.status(500).json({ error }));
    }
};

// exports.login = (req, res, next) => {
    // Trouver l'utilisateur dans la base de données et comparer son email et son password
    // Si correspondent => login
//};

//exports.forgot = (req, res, next) => {
    // Trouver l'utilisateur dans la base de données et comparer son email et son password
    // Si correspondent => login
//};

//exports.recover = (req, res, next) => {
    // Trouver l'utilisateur dans la base de données et comparer son email et son password
    // Si correspondent => login
//};