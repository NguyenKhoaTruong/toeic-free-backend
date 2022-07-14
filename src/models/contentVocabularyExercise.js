'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ContentVocabularyExercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // ContentVocabularyExercise.belongsTo(models.VocabularyExercise, { foreignKey: 'keyMap' })
            ContentVocabularyExercise.hasMany(models.VocabularyExercise, { foreignKey: 'part', as: 'partData' })
            ContentVocabularyExercise.hasMany(models.CommentVocabulary, { foreignKey: 'vocabularyid', as: 'userDataCommentContentVocabulary' })

        }
    };
    ContentVocabularyExercise.init({
        // contentvocabularyid DataTypes.STRING,
        audio_mp3: DataTypes.STRING,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
        meaning: DataTypes.STRING,
        number: DataTypes.STRING,
        sentence: DataTypes.STRING,
        transcribe: DataTypes.STRING,
        keyMap: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'ContentVocabularyExercise',
    });
    return ContentVocabularyExercise;
};