
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relatorio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Relatorio.belongsTo(models.Medico)
      Relatorio.belongsTo(models.Paciente)
    }
  };
  Relatorio.init({
    descricao: DataTypes.STRING,
    medicamentos: DataTypes.TEXT,
    name: DataTypes.TEXT,
    url: DataTypes.TEXT,
    pacienteId: DataTypes.INTEGER,
    medicoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Relatorio',
  });
  return Relatorio;
};
