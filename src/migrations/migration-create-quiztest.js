'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('QuizTests', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            audio_mp3: {
                allowNull: true,
                type: Sequelize.STRING
            },
            correct_answer: {
                allowNull: false,
                type: Sequelize.STRING
            },
            answer_user: {
                allowNull: true,
                type: Sequelize.STRING
            },
            img: {
                allowNull: true,
                type: Sequelize.STRING
            },
            number: {
                allowNull: true,
                type: Sequelize.STRING
            },

            option_1: {
                allowNull: false,
                type: Sequelize.STRING
            },
            option_2: {
                allowNull: false,
                type: Sequelize.STRING
            },
            option_3: {
                allowNull: false,
                type: Sequelize.STRING
            },
            option_4: {
                allowNull: false,
                type: Sequelize.STRING
            },
            paragrap: {
                allowNull: true,
                type: Sequelize.STRING
            },
            question: {
                allowNull: false,
                type: Sequelize.STRING
            },
            explain: {
                allowNull: false,
                type: Sequelize.STRING
            },
            keyMap: {
                allowNull: false,
                type: Sequelize.STRING
            },
            testid: {
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
        await queryInterface.dropTable('QuizTests');
    }
};