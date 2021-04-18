'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paciente.belongsTo(models.Medico)
      Paciente.belongsTo(models.Recepcionistas)

      Paciente.hasMany(models.Agendamentos)
      Paciente.hasMany(models.Relatorio)
    }
  };
  Paciente.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telefone: DataTypes.STRING,
    rua: DataTypes.STRING,
    cpf: DataTypes.STRING,
    bairro: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    cidade: DataTypes.STRING,
    medicoId: DataTypes.INTEGER,
    RecepcionistumId: DataTypes.INTEGER,
    recepcionistaId: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Paciente',
  });
  return Paciente;
};