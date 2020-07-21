const db = require('../config/database-test');
const fs = require('fs');

// Controller permettant d'afficher les informations d'un utilisateur
exports.getOnePost = (req, res, next) => {
    db.database.Post.findOne({ 
            where: {
                id: req.params.id
            },
            include: [{
                model: db.database.User,
                attributes: ['id', 'username']
            }]
        })
        .then(post => {
            const returnedPost = {
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "attachment": post.attachment,
                "likes": post.likes,
                "username": post.User.username,
                "userId": post.UserId,
                "createdAt": post.createdAt
            }
            return res.status(200).json(returnedPost)
        })
        .catch(error => res.status(404).json({ error }));
};

// Controller permettant d'afficher la liste des posts
exports.getAllPosts = (req, res, next) => {
    db.database.Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [{
            model: db.database.User,
            attributes: ['id', 'username']
        }]
    })
        .then(posts => {
            const arrayPosts = [];
            posts.forEach(post => 
                arrayPosts.push({
                    "id": post.id,
                    "title": post.title,
                    "content": post.content,
                    "attachment": post.attachment,
                    "likes": post.likes,
                    "username": post.User.username,
                    "userId": post.UserId,
                    "createdAt": post.createdAt
                })
            )
            return res.status(200).json(arrayPosts)
        })
        .catch(error => res.status(400).json({ error: error }))
};

// Controller permettant d'afficher tous les posts d'un utilisateur
exports.getAllPostsOfUser = (req, res, next) => {
    db.database.Post.findAll({
        where: {
            UserId: req.params.id
        },
        order: [["createdAt", "DESC"]],
        include: [{
            model: db.database.User,
            attributes: ['id', 'username']
        }]
    })
        .then(posts => {
            const arrayPosts = [];
            posts.forEach(post => 
                arrayPosts.push({
                    "id": post.id,
                    "title": post.title,
                    "content": post.content,
                    "attachment": post.attachment,
                    "likes": post.likes,
                    "username": post.User.username,
                    "userId": post.UserId,
                    "createdAt": post.createdAt
                })
            )
            return res.status(200).json(arrayPosts)
        })
        .catch(error => res.status(400).json({ error: error }))
};

// Controller permettant de créer un post
exports.createPost = (req, res, next) => {
    const postObject = req.file ?
    {
        ...JSON.parse(req.body.post),
        attachment: `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
    } : { ...req.body };

    db.database.Post.create({
        ...postObject,
    })
    .then(post => { 
        const returnedPost = {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "attachment": post.attachment,
            "userId": post.UserId,
            "likes": post.likes,
            "createdAt": post.createdAt
        }
        return res.status(201).json(returnedPost)
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(error);
    })
};

// Controller permettant d'ajouter ou enlever un like au post
exports.likePost = async (req, res, next) => {

};

// Controller permettant de modifier un post
exports.editPost = (req, res, next) => {
    const postObject = req.file ?
    {
        ...JSON.parse(req.body.post),
        attachment: `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
    } : { ...req.body };

    if (req.file) {
        db.database.Post.findOne({ where: { id: req.params.id }}, 'attachment')
        .then(post => {
            const filename = post.attachment.split('/uploads/images/')[1];
            fs.unlink(`uploads/images/${filename}`, () => {
                console.log('Ancienne image effacée avec succès !');
            })
        })
        .catch(error => console.log( error ));
    }

    db.database.Post.update({...postObject}, { returning: true, where: { id: req.params.id }})
        .then(([ rowsUpdate, [updatedPost] ]) => {
            const returnedPost = {
                "id": updatedPost.id,
                "title": updatedPost.title,
                "content": updatedPost.content,
                "attachment": updatedPost.attachment,
                "likes": updatedPost.likes,
                "userId": updatedPost.UserId,
                "createdAt": updatedPost.createdAt
            }
            res.status(201).json(returnedPost)
        })
        .catch(error => res.status(400).json({ error }));
};

// Controller permettant de supprimer un post
exports.deletePost = (req, res, next) => {
    db.database.Post.findOne({ where: { id: req.params.id }})
        .then(post => {
            if (post.attachment != null) {
                const filename = post.attachment.split('uploads/images/')[1];
                fs.unlink(`uploads/images/${filename}`, () => {
                    console.log('Image du post supprimée avec succès !');
                })
            }
            db.database.Post.destroy({ where: { id: req.params.id }})
                .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};

// Controller permettant d'afficher tous les commentaires d'un post
exports.getAllComments = (req, res, next) => {
    db.database.Comment.findAll({
        where: {
            PostId: req.params.id
        },
        order: [["createdAt", "DESC"]],
        include: [{
            model: db.database.User,
            attributes: ['id', 'username', 'avatar']
        }]
    })
    .then(comments => {
        const arrayComments = [];
        comments.forEach(comment => 
            arrayComments.push({
                "id": comment.id,
                "content": comment.content,
                "likes": comment.likes,
                "username": comment.User.username,
                "userId": comment.UserId,
                "postId": comment.PostId,
                "createdAt": comment.createdAt
            })
        )
        return res.status(200).json(arrayComments)
    })
    .catch(error => res.status(400).json({ error: error }))
};

// Controller permettant de créer un commentaire
exports.createComment = (req, res, next) => {
    const commentObject = { ...req.body, PostId: req.params.id };

    db.database.Comment.create({
        ...commentObject
    })
    .then(comment => { 
        const returnedComment = {
            "id": comment.id,
            "content": comment.content,
            "userId": comment.UserId,
            "postId": comment.PostId,
            "likes": comment.likes,
            "createdAt": comment.createdAt
        }
        return res.status(201).json(returnedComment)
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(error);
    })
};

// Controller permettant d'ajouter ou enlever un like au commentaire
exports.likeComment = async (req, res, next) => {

};

// Controller permettant de modifier un commentaire
exports.editComment = (req, res, next) => {
    const commentObject = { ...req.body };

    db.database.Comment.update({ ...commentObject }, { returning: true, where: { id: req.params.idComment }})
        .then(([ rowsUpdate, [updatedComment] ]) => {
            const returnedComment = {
                "id": updatedComment.id,
                "content": updatedComment.content,
                "likes": updatedComment.likes,
                "userId": updatedComment.UserId,
                "postId": updatedComment.PostId,
                "createdAt": updatedComment.createdAt
            }
            res.status(201).json(returnedComment)
        })
        .catch(error => res.status(400).json({ error }));
};

// Controller permettant de supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    db.database.Comment.destroy({ where: { id: req.params.idComment }})
        .then(() => res.status(200).json({ message: 'Comment supprimé !' }))
        .catch(error => res.status(400).json({ error }))
};