const db = require('../config/database-test');
const token = require('../middleware/getUserIdByToken');
const cloudinary = require('cloudinary').v2;
const pagination = require('../middleware/pagination');

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
        const userId = token.getUserIdByToken(req);

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

        const like = await db.database.Like_post.findOne({
            where: {
                UserId: userId,
                PostId: post.id,
            },
        });

        if (like) {
            liked = true;
        } else {
            liked = false;
        }
        
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
            "liked": liked,
            "createdAt": post.createdAt
        }
        return res.status(200).json(returnedPost)
    })
    .catch(error => res.status(404).json({ error }));
};

// Controller permettant d'afficher la liste des posts
/* exports.getAllPosts = (req, res, next) => {
    db.database.Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [{
            model: db.database.User,
            attributes: ['id', 'username', 'avatar']
        }]
    })
    .then(async posts => {
        const userId = token.getUserIdByToken(req);
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

            const like = await db.database.Like_post.findOne({
                where: {
                    UserId: userId,
                    PostId: post.id,
                },
            });

            if (like) {
                liked = true;
            } else {
                liked = false;
            }

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
                "liked": liked,
                "createdAt": post.createdAt
            })
        }
        return res.status(200).json(arrayPosts)
    })
    .catch(error => res.status(400).json({ error: error }))
}; */

// Controller permettant d'afficher la liste des posts et la pagination
exports.getAllPosts = (req, res, next) => {
    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);

    db.database.Post.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["createdAt", "DESC"]],
        include: [{
            model: db.database.User,
            attributes: ['id', 'username', 'avatar']
        }]
    })
    .then(async posts => {
        const userId = token.getUserIdByToken(req);
        const arrayPosts = [];
        const totalPosts = posts.count;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalPosts / limit);

        for (const post of posts.rows) {
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

            const like = await db.database.Like_post.findOne({
                where: {
                    UserId: userId,
                    PostId: post.id,
                },
            });

            if (like) {
                liked = true;
            } else {
                liked = false;
            }

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
                "liked": liked,
                "createdAt": post.createdAt
            })
        }
        return res.status(200).json({
            'posts': arrayPosts, 
            'totalPosts': totalPosts, 
            'totalPages': totalPages,
            'currentPage': currentPage
        })
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

            const like = await db.database.Like_post.findOne({
                where: {
                    UserId: req.params.id,
                    PostId: post.id,
                },
            });

            if (like) {
                liked = true;
            } else {
                liked = false;
            }

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
                "liked": liked,
                "createdAt": post.createdAt
            })
        }
        return res.status(200).json(arrayPosts)
    })
    .catch(error => res.status(400).json({ error: error }))
};

// Controller permettant de créer un post
exports.createPost = (req, res, next) => {
    const postObject = { ...req.body };

    if (postObject.attachment) {
        postObject.attachment = postObject.attachment.split('upload/').join('upload/f_auto,w_600/');
    }

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

//Controller permettant de vérifier si l'user connecté a liké ou non le post
exports.getLikePost = async (req, res, next) => {
    const user = await db.database.User.findByPk(req.params.userId);
    const post = await db.database.Post.findByPk(req.params.id);

    const like = await db.database.Like_post.findOne({
        where: {
            UserId: user.id,
            PostId: post.id,
        },
    });

    if (like) {
        res.status(200).json({ liked : true });
    } else {
        res.status(200).json({ liked : false });
    }
}

// Controller permettant d'ajouter un like au post
exports.likePost = async (req, res, next) => {
    const userId = token.getUserIdByToken(req);

    const user = await db.database.User.findOne({ where : { id: userId }});
    const post = await db.database.Post.findByPk(req.params.id);

    if (!post) {
        return next({
            message: `Impossible de trouver le post avec l'ID : - ${post.id}`,
            statusCode: 404,
        });
    }

    const like = await db.database.Like_post.create({
        UserId: user.id,
        PostId: post.id,
    });

    if (like) {
        res.status(201).json({ 
            message: 'Like ajouté au post avec succès !',
            liked : true 
        });
    } else {
        res.status(400).json({ message: "Impossible d'ajouter le like à ce Post !"});
    }
};

// Controller permettant d'enlever un like au post
exports.unlikePost = async (req, res, next) => {
    const user = await db.database.User.findByPk(req.params.userId);
    const post = await db.database.Post.findByPk(req.params.id);

    if (!post) {
        return next({
            message: `Impossible de trouver le post avec l'ID : - ${post.id}`,
            statusCode: 404,
        });
    }

    const unlike = await db.database.Like_post.destroy({ where: {
        UserId: user.id,
        PostId: post.id,
    }});

    if (unlike) {
        res.status(200).json({ 
            message: 'Like enlevé du post avec succès !', 
            liked: false 
        });
    } else {
        res.status(400).json({ message: "Impossible d'enlever le like de ce Post !"});
    }
};

// Controller permettant de modifier un post
exports.editPost = (req, res, next) => {
    const postObject = { ...req.body };

    if (postObject.attachment) {
        postObject.attachment = postObject.attachment.split('upload/').join('upload/f_auto,w_600/');
    }

    if (postObject.attachmentPublicId) {
        db.database.Post.findOne({ where: { id: req.params.id }}, 'attachment')
            .then(post => {
                cloudinary.uploader.destroy(`${post.attachmentPublicId}`, function(error, result) {
                    console.log(result, error);
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
                "attachmentPublicId": updatedPost.attachmentPublicId,
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
                cloudinary.uploader.destroy(`${post.attachmentPublicId}`, function(error, result) {
                    console.log(result, error);
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
        const userId = token.getUserIdByToken(req);
        const arrayComments = [];
        for (const comment of comments) {
            const likesCount = await db.database.Like_comment.count({
                where: {
                    CommentId: comment.id, 
                },
            });

            const like = await db.database.Like_comment.findOne({
                where: {
                    UserId: userId,
                    CommentId: comment.id,
                },
            });

            if (like) {
                liked = true;
            } else {
                liked = false;
            }

            arrayComments.push({
                "id": comment.id,
                "content": comment.content,
                "avatar": comment.User.avatar,
                "username": comment.User.username,
                "userId": comment.UserId,
                "postId": comment.PostId,
                "nbLikes": likesCount,
                "liked": liked,
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

//Controller permettant de vérifier si l'user connecté a liké ou non le commentaire
exports.getLikeComment = async (req, res, next) => {
    const user = await db.database.User.findByPk(req.params.userId);
    const comment = await db.database.Comment.findByPk(req.params.commentId);

    const like = await db.database.Like_comment.findOne({
        where: {
            UserId: user.id,
            CommentId: comment.id,
        },
    });

    if (like) {
        res.status(200).json({ liked : true });
    } else {
        res.status(200).json({ liked : false });
    }
}

// Controller permettant d'ajouter un like au commentaire
exports.likeComment = async (req, res, next) => {
    const userId = token.getUserIdByToken(req);
    const user = await db.database.User.findOne({ where: { id: userId }});
    const comment = await db.database.Comment.findByPk(req.params.commentId);

    if (!comment) {
        return next({
            message: `Impossible de trouver le commentaire avec l'ID : - ${comment.id}`,
            statusCode: 404,
        });
    }

    const like = await db.database.Like_comment.create({
        UserId: user.id,
        CommentId: comment.id,
    });

    if (like) {
        res.status(201).json({ 
            message: 'Like ajouté au commentaire avec succès !',
            liked : true 
        });
    } else {
        res.status(400).json({ message: "Impossible d'ajouter le like à ce Commentaire !"});
    }
};

// Controller permettant d'enlever un like au commentaire
exports.unlikeComment = async (req, res, next) => {
    const user = await db.database.User.findByPk(req.params.userId);
    const comment = await db.database.Comment.findByPk(req.params.commentId);

    if (!comment) {
        return next({
            message: `Impossible de trouver le commentaire avec l'ID : - ${comment.id}`,
            statusCode: 404,
        });
    }

    const unlike = await db.database.Like_comment.destroy({ where: {
        UserId: user.id,
        CommentId: comment.id,
    }});

    if (unlike) {
        res.status(200).json({ 
            message: 'Like enlevé du commentaire avec succès !', 
            liked: false 
        });
    } else {
        res.status(400).json({ message: "Impossible d'enlever le like de ce Commentaire !"});
    }
};

// Controller permettant de modifier un commentaire
exports.editComment = (req, res, next) => {
    const commentObject = { ...req.body };

    db.database.Comment.update({ ...commentObject }, { returning: true, where: { id: req.params.commentId }})
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
    db.database.Comment.destroy({ where: { id: req.params.commentId }})
        .then(() => res.status(200).json({ message: 'Comment supprimé !' }))
        .catch(error => res.status(400).json({ error }))
};