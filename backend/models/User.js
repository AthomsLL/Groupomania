const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id : {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        email : { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false
        },
        username : { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName : DataTypes.STRING,
        lastName : DataTypes.STRING,
        avatar : DataTypes.STRING,
        avatarPublicId : DataTypes.STRING,
        department : DataTypes.STRING,
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