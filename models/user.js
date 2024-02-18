'use strict';
const bcrypt = require('bcrypt');
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.event, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })

    }
  }
  user.init({
    id: 
    { 
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      autoIncrement:true,
    },
    email: DataTypes.STRING,
    password:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    tableName: "users"
  });

  user.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  });

  //class method
  /*
  user.getEmal =async (obj={}) =>{
      return obj
 }
 */


//instance method    
  user.prototype.getEmail = function(){
    return (this.email);
  }

  return user;
};