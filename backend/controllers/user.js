const db = require('../config/database-test');
const bcrypt = require('bcrypt');
const passwordValidator = require('../middleware/passwordValidator');
const fs = require('fs');

// Controller permettant d'afficher les informations d'un utilisateur
exports.getOneUser = (req, res, next) => {
    db.database.User.findOne({ 
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            const returnedUser = {
                "id": user.id,
                "email": user.email,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "avatar": user.avatar,
                "department": user.department,
                "isAdmin": user.isAdmin
            }
            return res.status(200).json(returnedUser)
        })
        .catch(error => res.status(404).json({ error }));
};

// Controller permettant d'afficher la liste des utilisateurs
exports.getAllUsers = (req, res, next) => {
    db.database.User.findAll()
        .then(users => {
            const arrayUsers = [];
            users.forEach(user => 
                arrayUsers.push({
                    "id": user.id,
                    "username": user.username,
                    "avatar": user.avatar
                })
            )
            return res.status(200).json(arrayUsers)
        })
        .catch(error => res.status(400).json({ error: error }));
};

// Controller permettant d'éditer le profil utilisateur
exports.editUserProfile = (req, res, next) => {
    const userProfileObject = req.file ?
    {
        ...JSON.parse(req.body.userProfile),
        avatar: `${req.protocol}://${req.get('host')}/uploads/images/avatars/${req.file.filename}`
    } : { ...req.body };

    if (req.file) {
        db.database.User.findOne({ where: { id: req.params.id }}, 'avatar')
        .then(userProfile => {
            const filename = userProfile.avatar.split('/uploads/images/avatars/')[1];
            fs.unlink(`uploads/images/avatars/${filename}`, () => {
                console.log('Ancien avatar effacé avec succès !');
            })
        })
        .catch(error => console.log( error ));
    }

    db.database.User.update({...userProfileObject}, { returning: true, where: { id: req.params.id } })
        .then(([ rowsUpdate, [updatedProfile] ]) => {
            const returnedProfile = {
                "id": updatedProfile.id,
                "email": updatedProfile.email,
                "username": updatedProfile.username,
                "firstName": updatedProfile.firstName,
                "lastName": updatedProfile.lastName,
                "avatar": updatedProfile.avatar,
                "department": updatedProfile.department,
                "isAdmin": updatedProfile.isAdmin 
            }
            res.status(201).json(returnedProfile)
        })
        .catch(error => res.status(400).json({ error }));
};

// Controller permettant de mettre à jour le pseudo de l'utilisateur
exports.editUsername = (req, res, next) => {
    db.database.User.update({ username: req.body.username }, { returning: true, where: { id: req.params.id }})
        .then(([ rowsUpdate, [updatedUsername] ])=> {
            const returnedUsername = {
                "id": updatedUsername.id,
                "username": updatedUsername.username
            }
            res.status(201).json(returnedUsername);
        })
        .catch(error => res.status(400).json({ error }));
};

// Controller permettant de mettre à jour le mot de passe de l'utilisateur
exports.editPassword = (req, res, next) => {
    db.database.User.findOne({ where: { id: req.params.id, password: req.body.oldPassword }})
        .then(() => {
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
                    db.database.User.update({ password: hash }, { returning: true, where: { id: req.params.id }})
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
}

// Controller permettant de supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
    db.database.User.findOne({ where: { id: req.params.id }})
        .then(user => {
            if (user.avatar != null) {
                const filename = user.avatar.split('uploads/images/avatars/')[1];
                fs.unlink(`uploads/images/avatars/${filename}`, () => {
                    console.log('Image avatar supprimée avec succès !');
                })
            }
            db.database.User.destroy({ where: { id: req.params.id }})
                .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
}