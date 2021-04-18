'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Relatorios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      medicamentos: {
        type: Sequelize.TEXT,
        
      },
      midiaurl: {
        type: Sequelize.TEXT
      },
      idpaciente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pacientes',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        
      },
      idmedico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'medicos',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Relatorios');
  }
};




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
    midiaurl: DataTypes.TEXT,
    idpaciente: DataTypes.INTEGER,
    idmedico: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Relatorio',
  });
  return Relatorio;
};
