'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Grammars', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            img_grammar: {
                allowNull: false,
                type: Sequelize.STRING
            },
            content_html: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            content_markdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            name_grammar: {
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
        await queryInterface.dropTable('Grammars');
    }
};