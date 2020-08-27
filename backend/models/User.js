const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id : {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            validate: {
                isUUID: 4,
            }
        },
        email : { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            valdiate: {
                isEmail: true
            }
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false
        },
        username : { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                len: [3, 15],
            }
        },
        firstName : {
            type: DataTypes.STRING,
            validate: {
                len: [3, 30],
                notEmpty: true,
            }
        },
        lastName : { 
            type: DataTypes.STRING,
            validate: {
                len: [2, 30],
                notEmpty: true,
            }
        },
        avatar : { 
            type: DataTypes.STRING,
            validate: {
                isUrl: true, 
            }
        },
        avatarPublicId : { 
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: true,
            }
        },
        department : { 
            type: DataTypes.STRING,
        },
        isAdmin : { 
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    
    User.associate = models => {
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });

        User.hasMany(models.Comment, {
            onDelete: "cascade"
        });

        User.hasMany(models.Like_post, {
            onDelete: "cascade"
        })

        User.hasMany(models.Like_comment, {
            onDelete: "cascade"
        })
    };

    return User;
  };