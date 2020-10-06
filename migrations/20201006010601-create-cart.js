'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'Orders',

          // This is the column name of the referenced model
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'Products',

          // This is the column name of the referenced model
          key: 'id'
        }
      },
      price_product: {
        type: Sequelize.DOUBLE
      },
      quantity: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Carts');
  }
};