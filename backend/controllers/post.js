const db = require('../config/database-test');
const token = require('../middleware/getUserIdByToken');
const fs = require('fs');

// Controller permettant d'afficher les informations d'un utilisateur
exports.getOnePost = (req, res, next) => {
    db.database.Post.findOne({ 
        where: {
            id: req.params.id
        },
        include: [{
            model: db.database.User,
            attributes: ['id', 'username', 'avatar']
        }]
    })
    .then(async post => {
        const commentsCount = await db.database.Comment.count({
            where: {
                PostId: post.id,
            },
        });
        
        const likesCount = await db.database.Like_post.count({
            where: {
                PostId: post.id, 
            }
        });        
        
        const returnedPost = {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "attachment": post.attachment,
            "avatar": post.User.avatar,
            "username": post.User.username,
            "userId": post.UserId,
            "nbLikes": likesCount,
            "nbComments": commentsCount,
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
            attributes: ['id', 'username', 'avatar']
        }]
    })
    .then(async posts => {
        const arrayPosts = [];
        for (const post of posts) {
            const commentsCount = await db.database.Comment.count({
                where: {
                    PostId: post.id,
                }
            });
            
            const likesCount = await db.database.Like_post.count({
                where: {
                    PostId: post.id, 
                },
            });

            arrayPosts.push({
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "attachment": post.attachment,
                "avatar": post.User.avatar,
                "username": post.User.username,
                "userId": post.UserId,
                "nbLikes": likesCount,
                "nbComments": commentsCount,
                "createdAt": post.createdAt
            })
        }
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
            attributes: ['id', 'username', 'avatar']
        }]
    })
    .then(async posts => {
        const arrayPosts = [];
        for (const post of posts) {
            const commentsCount = await db.database.Comment.count({
                where: {
                    PostId: post.id,
                },
            });
            
            const likesCount = await db.database.Like_post.count({
                where: {
                    PostId: post.id, 
                },
            });

            arrayPosts.push({
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "attachment": post.attachment,
                "avatar": post.User.avatar,
                "username": post.User.username,
                "userId": post.UserId,
                "nbLikes": likesCount,
                "nbComments": commentsCount,
                "createdAt": post.createdAt
            })
        }
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
    const userId = token.getUserIdByToken(req);
    const user = await db.database.User.findOne({ where: { id: userId }});
    const post = await db.database.Post.findByPk(req.params.id);

    if (!post) {
        return next({
            message: `Impossible de trouver le post avec l'ID : - ${req.params.id}`,
            statusCode: 404,
        });
    }

    const liked = await db.database.Like_post.findOne({
        where: {
            UserId: user.id,
            PostId: req.params.id,
        },
    });

    if (liked) {
        await db.database.Like_post.destroy({ where: {
            UserId: user.id,
            PostId: req.params.id,
        }});
        res.status(200).json({ message: 'Like enlevé du post avec succès !'});
    } else {
        await db.database.Like_post.create({
            UserId: user.id,
            PostId: req.params.id,
        });
        res.status(201).json({ message: 'Like ajouté au post avec succès !'});
    }
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
    .then(async comments => {
        const arrayComments = [];
        for (const comment of comments) {
            const likesCount = await db.database.Like_comment.count({
                where: {
                    CommentId: comment.id, 
                },
            });

            arrayComments.push({
                "id": comment.id,
                "content": comment.content,
                "avatar": comment.User.avatar,
                "username": comment.User.username,
                "userId": comment.UserId,
                "postId": comment.PostId,
                "nbLikes": likesCount,
                "createdAt": comment.createdAt
            })
        }
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
            "createdAt": comment.createdAt
        }
        return res.status(201).json(returnedComment)
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(error);
    })
};

// Controller permettant d'ajouter ou enlever un like au post
exports.likeComment = async (req, res, next) => {
    const userId = token.getUserIdByToken(req);
    const user = await db.database.User.findOne({ where: { id: userId }});
    const comment = await db.database.Comment.findByPk(req.params.idComment);
  
    if (!comment) {
        return next({
            message: `Impossible de trouver le commentaire avec l'ID : - ${req.params.idComment}`,
            statusCode: 404,
        });
    }
  
    const liked = await db.database.Like_comment.findOne({
        where: {
            UserId: user.id,
            CommentId: req.params.idComment,
        },
    });
  
    if (liked) {
        await db.database.Like_comment.destroy({ where: {
            UserId: user.id,
            CommentId: req.params.idComment,
        }});
        res.status(200).json({ message: 'Like enlevé du commentaire avec succès !'});
    } else {
        await db.database.Like_comment.create({
            UserId: user.id,
            CommentId: req.params.idComment,
        });
        res.status(201).json({ message: 'Like ajouté au commentaire avec succès !'});
    }
};

// Controller permettant de modifier un commentaire
exports.editComment = (req, res, next) => {
    const commentObject = { ...req.body };

    db.database.Comment.update({ ...commentObject }, { returning: true, where: { id: req.params.idComment }})
        .then(([ rowsUpdate, [updatedComment] ]) => {
            const returnedComment = {
                "id": updatedComment.id,
                "content": updatedComment.content,
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