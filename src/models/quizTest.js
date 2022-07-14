'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QuizTest extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            QuizTest.belongsTo(models.Test, { foreignKey: 'testid', targetKey: 'id', as: 'examtestData' })

        }
    };
    QuizTest.init({
        // quiztestid DataTypes.STRING,
        audio_mp3: DataTypes.STRING,
        correct_answer: DataTypes.STRING,
        answer_user: DataTypes.STRING,
        img: DataTypes.STRING,
        number: DataTypes.STRING,
        option_1: DataTypes.STRING,
        option_2: DataTypes.STRING,
        option_3: DataTypes.STRING,
        option_4: DataTypes.STRING,
        paragrap: DataTypes.STRING,
        question: DataTypes.STRING,
        explain: DataTypes.STRING,
        keyMap: DataTypes.STRING,
        testid: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'QuizTest',
    });
    return QuizTest;
};