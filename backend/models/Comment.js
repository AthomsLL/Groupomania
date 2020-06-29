module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content : {
            type: DataTypes.STRING,
            allowNull: false
        },
        likes : DataTypes.INTEGER
    });
    
    Comment.associate = models => {
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            through: models.CommentLike
        });

        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Comment;
  };