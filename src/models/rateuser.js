'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rate extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Note.hasMany(models.User, { foreignKey: 'id', as: 'userDataNote' })
            Rate.belongsTo(models.User, { foreignKey: 'userid', targetKey: 'id', as: 'userDataRate' });
        }
    };
    Rate.init({
        // id: DataTypes.INTEGER,
        rate: DataTypes.STRING,
        userid: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Rate',
    });
    return Rate;
};