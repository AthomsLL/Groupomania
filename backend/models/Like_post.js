module.exports = (sequelize, DataTypes) => {
    const Like_post = sequelize.define('Like_post', {
      
    }, {
      freezeTableName: true,
      timestamps: true,
      updatedAt: false,
    });

    //Like_post.removeAttribute('id');

    Like_post.associate = models => {
      Like_post.belongsTo(models.User, {
          onDelete: "cascade",
          foreignKey: {
              allowNull: false
          }
      });

      Like_post.belongsTo(models.Post, {
        onDelete: "cascade",
        foreignKey: {
            allowNull: false
        }
      });
    };

    return Like_post;
  };