'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recepcionistas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recepcionistas.belongsTo(models.Medico)
      Recepcionistas.hasMany(models.Paciente)
      Recepcionistas.hasMany(models.Agendamentos)
    }
  };
  Recepcionistas.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    medicoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recepcionistas',
  });
  return Recepcionistas;
};