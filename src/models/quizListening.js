'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QuizListening extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            QuizListening.hasMany(models.ListenExercise, { foreignKey: 'part', as: 'partData' });
            QuizListening.hasMany(models.ListenExercise, { foreignKey: 'test_year', as: 'yearData' })
        }
    };
    QuizListening.init({
        // quizlistenid DataTypes.STRING,
        question: DataTypes.STRING,
        correct_answer: DataTypes.STRING,
        option_1: DataTypes.STRING,
        option_2: DataTypes.STRING,
        option_3: DataTypes.STRING,
        option_4: DataTypes.STRING,
        explain: DataTypes.STRING,
        img: DataTypes.STRING,
        audio_mp3: DataTypes.STRING,
        number: DataTypes.STRING,
        keyPart: DataTypes.STRING,
        keyYear: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'QuizListening',
    });
    return QuizListening;
};