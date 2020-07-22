module.exports = (sequelize, DataTypes) => {
    const Like_comment = sequelize.define('Like_comment', {
      
    }, {
      freezeTableName: true,
      timestamps: true,
      updatedAt: false,
    });

    //Like_comment.removeAttribute('id');

    Like_comment.associate = models => {
      Like_comment.belongsTo(models.User, {
          foreignKey: {
              allowNull: false
          }
      });

      Like_comment.belongsTo(models.Comment, {
        foreignKey: {
            allowNull: false
        }
      });
    };

    return Like_comment;
  };