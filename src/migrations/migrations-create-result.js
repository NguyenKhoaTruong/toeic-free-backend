'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Results', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            correct_listen: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            correct_read: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            time: {
                allowNull: false,
                type: Sequelize.DATE()
            },
            number_correct: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            number_wrong: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            testid: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            userid: {
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
        await queryInterface.dropTable('Results');
    }
};