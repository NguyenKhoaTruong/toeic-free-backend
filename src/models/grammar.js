'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grammar extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Grammar.hasMany(models.CommentGrammar, { foreignKey: 'grammarid', as: 'userDataCommentForGrammar' })
        }
    };
    Grammar.init({
        // grammarid: DataTypes.STRING,
        img_grammar: DataTypes.STRING,
        content_html: DataTypes.TEXT('long'),
        content_markdown: DataTypes.TEXT('long'),
        name_grammar: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'Grammar',
    });
    return Grammar;
};