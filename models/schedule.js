'use strict';
module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING, allowNull: false},
        description: {type: DataTypes.STRING, allowNull: false},
        fromDate: {type: DataTypes.DATEONLY, allowNull: false},
        fromTime: {type: DataTypes.TIME, allowNull: true},
        toDate: {type: DataTypes.DATEONLY, allowNull: false},
        toTime: {type: DataTypes.TIME, allowNull: true},
        isAllday: {type: DataTypes.TINYINT, allowNull: false}
    },{
        timestamps: false
    });
    Schedule.associate = function(models) {
        // associations can be defined here
    };
    return Schedule;
};