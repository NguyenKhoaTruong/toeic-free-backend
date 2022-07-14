'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ReadExercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ReadExercise.belongsTo(models.QuizReading, { foreignKey: 'part', targetKey: 'keyPart', as: 'partData' });
            ReadExercise.belongsTo(models.QuizReading, { foreignKey: 'test_year', targetKey: 'keyYear', as: 'yearData' });
            ReadExercise.hasOne(models.ExamResult, { foreignKey: 'readid' });
        }
    };
    ReadExercise.init({
        // readid DataTypes.STRING,
        level: DataTypes.STRING,
        part: DataTypes.STRING,
        name_reading: DataTypes.STRING,
        test_year: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ReadExercise',
    });
    return ReadExercise;
};