'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QuizReading extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            QuizReading.hasMany(models.ReadExercise, { foreignKey: 'part', as: 'partData' });
            QuizReading.hasMany(models.ReadExercise, { foreignKey: 'test_year', as: 'yearData' });
        }
    };
    QuizReading.init({
        // quizreadid DataTypes.STRING,
        question: DataTypes.STRING,
        correct_answer: DataTypes.STRING,
        option_1: DataTypes.STRING,
        option_2: DataTypes.STRING,
        option_3: DataTypes.STRING,
        option_4: DataTypes.STRING,
        explain: DataTypes.STRING,
        letterquestion: DataTypes.STRING,
        letterquestiontwo: DataTypes.STRING,
        letterquestionthree: DataTypes.STRING,
        number: DataTypes.INTEGER,
        keyPart: DataTypes.STRING,
        keyYear: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'QuizReading',
    });
    return QuizReading;
};