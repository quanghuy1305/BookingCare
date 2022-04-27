"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Online extends Model {
    static associate(models) {}
  }
  Doctor_Online.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.BLOB,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Doctor_Online",
    }
  );
  return Doctor_Online;
};
