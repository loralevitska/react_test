const { Model } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      field: 'firstName',
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'lastName',
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      field: 'isAdmin',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: 'phoneNumber',
    },
    createdAt: {
      field: 'createdAt',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updatedAt',
      type: DataTypes.DATE,
    },
    deletedAt: {
      field: 'deletedAt',
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
    timestamps: true,
    underscored: true,
  });

  return User;
};
