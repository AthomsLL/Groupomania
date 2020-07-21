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
        attachment : DataTypes.STRING
    });
    
    Post.associate = models => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Post.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };

    return Post;
  };