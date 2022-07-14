'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VocabularyExercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            VocabularyExercise.belongsTo(models.ContentVocabularyExercise, { foreignKey: 'part', targetKey: 'keyMap', as: 'partData' });
        }
    };
    VocabularyExercise.init({
        // id: DataTypes.INTEGER,
        img_vocabulary: DataTypes.STRING,
        name_vocabulary: DataTypes.STRING,
        part: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'VocabularyExercise',
    });
    return VocabularyExercise;
};