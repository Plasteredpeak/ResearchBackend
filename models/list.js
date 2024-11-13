"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      List.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  List.init(
    {
      userId: DataTypes.INTEGER,
      type: {
        type: DataTypes.ENUM("movie", "series"),
        allowNull: false,
      },
      mediaId: DataTypes.STRING,
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      releaseDate: DataTypes.STRING,
      rating: DataTypes.STRING,
      userRating: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("completed", "planning", "watching"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "List",
    }
  );
  return List;
};
