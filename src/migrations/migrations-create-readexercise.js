'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ReadExercises', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            level: {
                allowNull: false,
                type: Sequelize.STRING
            },
            part: {
                allowNull: false,
                type: Sequelize.STRING
            },
            name_reading: {
                allowNull: false,
                type: Sequelize.STRING
            },
            test_year: {
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
        await queryInterface.dropTable('ReadExercises');
    }
};