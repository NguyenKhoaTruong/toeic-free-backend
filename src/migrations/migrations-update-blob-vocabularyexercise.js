module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('VocabularyExercises', 'img_vocabulary', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('VocabularyExercises', 'img_vocabulary', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};