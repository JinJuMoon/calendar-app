'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Schedules', {
      id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
      title: {type: Sequelize.STRING, allowNull: false},
      description: {type: Sequelize.STRING, allowNull: false},
      fromDate: {type: Sequelize.DATE, allowNull: false},
      toDate: {type: Sequelize.DATE, allowNull: false},
      fromTime: {type: Sequelize.TIME, allowNull: true},
      toTime: {type: Sequelize.TIME, allowNull: true},
      startDisplay: {type: Sequelize.DATEONLY, allowNull: false},
      endDisplay: {type: Sequelize.DATEONLY, allowNull: false},
      isAllday: {type: Sequelize.TINYINT, allowNull: false},
      isConsecutive: {type: DataTypes.TINYINT, allowNull: false}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Schedules');
  }
};