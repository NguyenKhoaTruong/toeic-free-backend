'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ExamResult extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Result.hasOne(models.Test, { foreignKey: 'testid' });
            ExamResult.belongsTo(models.User, { foreignKey: 'userid' });
            ExamResult.belongsTo(models.ListenExercise, { foreignKey: 'listenid' });
            ExamResult.belongsTo(models.ReadExercise, { foreignKey: 'readid' });
        }
    };
    ExamResult.init({
        // id: DataTypes.INTEGER,
        score: DataTypes.INTEGER,
        listenid: DataTypes.INTEGER,
        readid: DataTypes.INTEGER,
        userid: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'ExamResult',
    });
    return ExamResult;
};