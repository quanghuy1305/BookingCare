"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      // nhớ đem cái này từ user sang patient để check lý do khám bệnh

      Patient.belongsTo(models.Allcode, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderPatient",
      });

      Patient.hasMany(models.Booking, {
        foreignKey: "patientId",
        as: "patientData",
      });
    }
  }
  Patient.init(
    {
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      roleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
