const db = require('../config/database-test');

// Controller permettant d'afficher tous les commentaires d'un utilisateur
exports.getAllCommentsOfUser = (req, res, next) => {
    db.database.Comment.findAll({
        where: {
            UserId: req.params.id
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

            const like = await db.database.Like_comment.findOne({
                where: {
                    UserId: req.params.id,
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
                "postId": comment.postId,
                "nbLikes": likesCount,
                "liked": liked,
                "createdAt": comment.createdAt
            })
        }
        return res.status(200).json(arrayComments)
    })
    .catch(error => res.status(400).json({ error: error }))
};