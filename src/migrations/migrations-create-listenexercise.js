'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ListenExercises', {

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
            name_listening: {
                allowNull: false,
                type: Sequelize.STRING
            },
            test_year: {
                allowNull: false,
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
        await queryInterface.dropTable('ListenExercises');
    }
};