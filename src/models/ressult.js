'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Result extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Result.hasOne(models.Test, { foreignKey: 'testid' });
            Result.belongsTo(models.User, { foreignKey: 'userid' });
            Result.belongsTo(models.Test, { foreignKey: 'testid' });
        }
    };
    Result.init({
        // id: DataTypes.INTEGER,
        correct_listen: DataTypes.INTEGER,
        correct_read: DataTypes.INTEGER,
        time: DataTypes.DATE(),
        number_correct: DataTypes.INTEGER,
        number_wrong: DataTypes.INTEGER,
        testid: DataTypes.INTEGER,
        userid: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Result',
    });
    return Result;
};