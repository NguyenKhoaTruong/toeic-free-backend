'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CommentVocabulary extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            CommentVocabulary.belongsTo(models.User, { foreignKey: 'userid', targetKey: 'id', as: 'userDataCommentVocabulary' });
            CommentVocabulary.belongsTo(models.ContentVocabularyExercise, { foreignKey: 'vocabularyid', targetKey: 'id', as: 'userDataCommentContentVocabulary' });
        }
    };
    CommentVocabulary.init({
        // id: DataTypes.INTEGER,
        content_comment_vocabulary: DataTypes.STRING,
        vocabularyid: DataTypes.INTEGER,
        userid: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'CommentVocabulary',
    });
    return CommentVocabulary;
};