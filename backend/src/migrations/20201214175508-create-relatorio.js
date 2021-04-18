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
      name: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      pacienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pacientes',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        
      },
      medicoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Medicos',
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
