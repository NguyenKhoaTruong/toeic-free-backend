'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CommentGrammar extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            CommentGrammar.belongsTo(models.User, { foreignKey: 'userid', targetKey: 'id', as: 'userDataCommentGrammar' });
            CommentGrammar.belongsTo(models.Grammar, { foreignKey: 'grammarid', targetKey: 'id', as: 'userDataCommentForGrammar' });
        }
    };
    CommentGrammar.init({
        // id: DataTypes.INTEGER,
        content_comment_grammar: DataTypes.STRING,
        grammarid: DataTypes.INTEGER,
        userid: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'CommentGrammar',
    });
    return CommentGrammar;
};