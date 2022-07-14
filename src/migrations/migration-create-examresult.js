'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ExamResults', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            score: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            listenid: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            readid: {
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
        await queryInterface.dropTable('ExamResults');
    }
};