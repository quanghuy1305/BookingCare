"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.Allcode, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypeData",
      });
      Schedule.belongsTo(models.User, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: "doctorData",
      });
    }
  }
  Schedule.init(
    {
      status: DataTypes.BOOLEAN,
      maxNumber: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
