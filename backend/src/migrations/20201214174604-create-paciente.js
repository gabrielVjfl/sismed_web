'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pacientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        

      },
      rua: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      },
      RecepcionistumId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Recepcionistas',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
     
      },
      recepcionistaId: {
        type: Sequelize.BOOLEAN,
        default: true
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
    await queryInterface.dropTable('Pacientes');
  }
};
