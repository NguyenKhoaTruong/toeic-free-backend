'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ContentVocabularyExercises', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            audio_mp3: {
                allowNull: false,
                type: Sequelize.STRING
            },
            content: {
                allowNull: false,
                type: Sequelize.STRING
            },
            image: {
                allowNull: false,
                type: Sequelize.STRING
            },
            meaning: {
                allowNull: false,
                type: Sequelize.STRING
            },
            number: {
                allowNull: false,
                type: Sequelize.STRING
            },
            sentence: {
                allowNull: false,
                type: Sequelize.STRING
            },
            transcribe: {
                allowNull: false,
                type: Sequelize.STRING
            },
            keyMap: {
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
        await queryInterface.dropTable('ContentVocabularyExercises');
    }
};