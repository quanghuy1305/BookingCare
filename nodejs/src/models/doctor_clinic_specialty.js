'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_Cl_Sp extends Model {

    static associate(models) {
  
    } 
  };
  Doctor_Cl_Sp.init({
    doctorId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Doctor_Cl_Sp',
  });
  return Doctor_Cl_Sp;
};