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
          onDelete: "cascade",
          foreignKey: {
              allowNull: false
          }
      });

      Like_comment.belongsTo(models.Comment, {
        onDelete: "cascade",
        foreignKey: {
            allowNull: false
        }
      });
    };

    return Like_comment;
  };