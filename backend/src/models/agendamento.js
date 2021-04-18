
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Agendamentos.belongsTo(models.Paciente)
      Agendamentos.belongsTo(models.Medico)
      Agendamentos.belongsTo(models.Recepcionistas)
    }
  };
  Agendamentos.init({
    descricao: DataTypes.TEXT,
    day: DataTypes.DATEONLY,
    hora: DataTypes.TIME,
    status: DataTypes.STRING,
    pacienteId: DataTypes.INTEGER,
    medicoId: DataTypes.INTEGER,

    recepcionistaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Agendamentos',
    freezeTableName: true,
    
  });
  return Agendamentos;
};