const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('activity', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allownull: false
      },
      name: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      difficulty: {
        type : DataTypes.STRING,//DataTypes.ENUM('1', '2', '3', '4', '5'),
        allowNull: false
      },
      duration: {
        type: DataTypes.STRING,
        allownull: false
      },
      season: {
        type : DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
        allowNull: false
      }
    });
  };