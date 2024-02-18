'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      event.belongsTo(models.user)
    }
  }
  event.init({
    
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4 // Use DataTypes.UUIDV4 instead of DataTypes.UUID4
    },
    location: DataTypes.STRING,
    description: DataTypes.STRING,
    time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'event',
    tableName: 'events'
  });

  event.findEvent = async function(location){
    return this.findAll({
      where: {
        location: location,
      },
  });
  }
  return event
};