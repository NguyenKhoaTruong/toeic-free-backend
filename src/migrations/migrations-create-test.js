'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Tests', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            img_test: {
                allowNull: false,
                type: Sequelize.STRING
            },
            name_test: {
                allowNull: false,
                type: Sequelize.STRING
            },
            test_year: {
                allowNull: false,
                type: Sequelize.STRING
            },
            typeText: {
                allowNull: false,
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Tests');
    }
};