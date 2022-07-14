'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasOne(models.Result, { foreignKey: 'userid' });
      // User.belongsTo(models.Note, { foreignKey: 'id', targetKey: 'userid', as: 'userDataNote' });
      User.hasMany(models.Note, { foreignKey: 'userid', as: 'userDataNote' })
      User.hasMany(models.Rate, { foreignKey: 'userid', as: 'userDataRate' })
      User.hasOne(models.Result, { foreignKey: 'userid' })
      User.hasMany(models.CommentGrammar, { foreignKey: 'userid', as: 'userDataCommentGrammar' })
      User.hasMany(models.CommentVocabulary, { foreignKey: 'userid', as: 'userDataCommentVocabulary' })
      User.hasOne(models.ExamResult, { foreignKey: 'userid' })
    }
  };
  User.init({
    // id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    roleId: DataTypes.STRING,
    address: DataTypes.STRING,
    cmnd: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    dateOfBirth: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};