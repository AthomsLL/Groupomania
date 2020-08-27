const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id : {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            validate: {
                isUUID: 4,
            }
        },
        content : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 200],
            }
        }
    });
    
    Comment.associate = models => {
        Comment.belongsTo(models.User, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });

        Comment.belongsTo(models.Post, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Comment;
  };