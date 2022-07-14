'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Note extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Note.hasMany(models.User, { foreignKey: 'id', as: 'userDataNote' })
            Note.belongsTo(models.User, { foreignKey: 'userid', targetKey: 'id', as: 'userDataNote' });
        }
    };
    Note.init({
        // id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        notecontent: DataTypes.TEXT('long'),
        userid: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Note',
    });
    return Note;
};