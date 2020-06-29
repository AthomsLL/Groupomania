module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title : { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        content : {
            type: DataTypes.STRING,
            allowNull: false
        },
        attachment : DataTypes.STRING,
        attachmentType : DataTypes.STRING,
        likes : DataTypes.INTEGER
    });
    
    Post.associate = models => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            through: models.PostLike
        });

        Post.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };

    return Post;
  };