require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const passwordValidator = require('../middleware/passwordValidator');
const db = require('../config/database-test');

exports.signup = (req, res, next) => {
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
        bcrypt.hash(req.body.password, 10, function(error, hash) {            
            db.database.User.create({
                email: req.body.email,
                username: req.body.username,
                password: hash
            })
            .then((user) => {  
                res.status(201).send({
                    token: jwt.sign(
                        { 
                            'id': user.id,
                            'email': user.email, 
                            'username': user.username, 
                            'createdAt': user.createdAt 
                        },
                        process.env.SECRET,
                        { expiresIn: '2d' }
                    )
                })
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            })
        })
    }
};

exports.login = (req, res, next) => {
    db.database.User.findOne({ 
        where: {
            email: req.body.email
        }
     })
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(!result) {
                return res.status(401).send({ error: 'Identifiants incorrects !'});
            }

            res.status(200).send({
                token: jwt.sign(
                    { 
                        'id': user.id,
                        'avatar': user.avatar, 
                        'avatarPublicId': user.avatarPublicId,
                        'email': user.email, 
                        'username': user.username,
                        'firstName': user.firstName,
                        'lastName': user.lastName,
                        'department': user.department,
                        'isAdmin': user.isAdmin,
                        'createdAt': user.createdAt 
                    },
                    process.env.SECRET,
                    { expiresIn: '2d' }
                )
            });
        });
    })
    .catch(error => res.status(500).send( error ));
};