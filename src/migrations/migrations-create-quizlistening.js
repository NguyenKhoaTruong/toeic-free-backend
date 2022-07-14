'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('QuizListenings', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            question: {
                allowNull: false,
                type: Sequelize.STRING
            },
            correct_answer: {
                allowNull: false,
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
            img: {
                allowNull: false,
                type: Sequelize.STRING
            },
            audio_mp3: {
                allowNull: false,
                type: Sequelize.STRING
            },
            number: {
                allowNull: false,
                type: Sequelize.STRING
            },
            keyPart: {
                allowNull: false,
                type: Sequelize.STRING
            },
            keyYear: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            explain: {
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
        await queryInterface.dropTable('QuizListenings');
    }
};