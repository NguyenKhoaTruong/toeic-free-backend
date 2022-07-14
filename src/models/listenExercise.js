'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ListenExercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ListenExercise.belongsTo(models.QuizListening, { foreignKey: 'part', targetKey: 'keyPart', as: 'partData' });
            ListenExercise.belongsTo(models.QuizListening, { foreignKey: 'test_year', targetKey: 'keyYear', as: 'yearData' });
            ListenExercise.hasOne(models.ExamResult, { foreignKey: 'listenid' });
        }
    };
    ListenExercise.init({
        // listenId DataTypes.STRING,
        level: DataTypes.STRING,
        part: DataTypes.STRING,
        name_listening: DataTypes.STRING,
        test_year: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'ListenExercise',
    });
    return ListenExercise;
};