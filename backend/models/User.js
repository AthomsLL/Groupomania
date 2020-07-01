module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        department : DataTypes.STRING,
        isAdmin : { 
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    
    User.associate = models => {
        User.belongsToMany(models.Post, {
            onDelete: "cascade",
            through: models.PostLike
        });

        User.belongsToMany(models.Comment, {
            onDelete: "cascade",
            through: models.CommentLike
        });

        User.hasMany(models.Message, {
            onDelete: "cascade"
        })
    };

    return User;
  };