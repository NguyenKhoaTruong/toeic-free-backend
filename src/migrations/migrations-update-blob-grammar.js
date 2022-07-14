module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Grammars', 'img_grammar', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Grammars', 'img_grammar', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};