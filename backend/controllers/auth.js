require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const passwordValidator = require('../middleware/passwordValidator');
const resetCode = require('../middleware/generateResetCode');
const db = require('../config/database-test');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash
            })
            .then((user) => {  
                res.status(201).send({
                    token: jwt.sign(
                        { 
                            'id': user.id,
                            'email': user.email, 
                            'username': user.username, 
                            'isAdmin': user.isAdmin,
                            'createdAt': user.createdAt 
                        },
                        process.env.SECRET,
                        { expiresIn: '1d' }
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
                    { expiresIn: '1d' }
                )
            });
        });
    })
    .catch(error => res.status(500).send( error ));
};

exports.forgotPassword = (req, res, next) => {
    db.database.User.findOne({
        where: {
            email : req.body.email
        }
    })
    .then(user => {
        if(!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé !'});
        }

        let code = resetCode.generateResetCode();

        const msg = {
            to: req.body.email,
            from: process.env.SENDGRID_FROM_MAIL,
            subject: 'Groupomania - Voici votre code de vérification pour modifier votre mot de passe',
            html: `
                    <h2>Merci d'utiliser Groupomania</h2>
                    <br><br>
                    <p>Votre code de vérification pour modifier votre mot de passe est :</p>
                    <br><br>
                    <strong>${code}</strong>
                    <br><br>
                    <p>Merci de copier ce code et de l'utiliser sur l'application pour valider la modification de votre mot de passe.</p>
                    <br><br>
                    <p>L'équipe technique Groupomania.</p>
            `
        }

        db.database.User.update({resetCode: code}, { returning: true, where: { email: req.body.email }})
        .then(
            sgMail
            .send(msg)
            .then(() => {
                console.log('Email envoyé !')
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
                        { expiresIn: '1d' }
                    )
                });
            })
            .catch((error) => {
                console.error(error);
                res.status(401).send({ error: "L'email n'a pas pu être envoyé !"});
            }))
        .catch(error => res.status(400).json({ error }))
    })
};

exports.resetPassword = (req, res, next) => {
    db.database.User.findOne({ where: { resetCode: req.body.resetCode }})
        .then((user) => {
            let isValid = true;
            let message = '';

            if (!passwordValidator.validate(req.body.password)) {
                isValid = false;
                message = "Le mot de passe doit comporter au moins 8 caractères, dont au moins 1 minuscule, 1 majuscule et 1 chiffre.";
            }

            if (!isValid) {
                res.status(403).json({ message: message });
            } else {
                bcrypt.hash(req.body.password, 10, function(error, hash) {
                    db.database.User.update({ password: hash, resetCode: null }, { returning: true, where: { email: user.email }})
                        .then(([ rowsUpdate, [updatedPassword] ])=> {
                            const returnedPassword = {
                                "id": updatedPassword.id,
                                "password": updatedPassword.password
                            }
                            res.status(201).json(returnedPassword);
                        })
                        .catch(error => res.status(400).json({ error }));
                })
            }
        })
};