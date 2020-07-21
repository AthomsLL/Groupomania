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
            attributes: ['id', 'username']
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
                    "postId": comment.postId,
                    "createdAt": comment.createdAt
                })
            )
            return res.status(200).json(arrayComments)
        })
        .catch(error => res.status(400).json({ error: error }))
};