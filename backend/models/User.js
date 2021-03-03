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
        },
        department : { 
            type: DataTypes.STRING,
        },
        isAdmin : { 
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        resetLink: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    });
    
    User.associate = models => {
        User.hasMany(models.Post, {
            onDelete: "CASCADE"
        });

        User.hasMany(models.Comment, {
            onDelete: "CASCADE"
        });

        User.hasMany(models.Like_post, {
            onDelete: "CASCADE"
        })

        User.hasMany(models.Like_comment, {
            onDelete: "CASCADE"
        })
    };

    return User;
  };