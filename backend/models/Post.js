const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id : {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            validate: {
                isUUID: 4,
            }
        },
        title : { 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50],
            }
        },
        content : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 250],
            }
        },
        attachment : { 
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            }
        },
        attachmentPublicId : { 
            type: DataTypes.STRING,
        }
    });
    
    Post.associate = models => {
        Post.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });

        Post.hasMany(models.Comment, {
            onDelete: "CASCADE"
        });
    };

    return Post;
  };