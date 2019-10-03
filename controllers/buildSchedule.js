const moment = require('moment');
const models = require('../models/');

const calDate = moment();
const startDate = calDate.clone().startOf('month').format('L');
const endDate = calDate.clone().endOf('month').format('L');

module.exports = {
    getScheduleArray: getScheduleArray
};

function getScheduleArray() {

    let scheduleArray = [];

    models.Schedule.findAll({
        where: {
            fromDate: {
                $between: [startDate, endDate]
            }
        }
    }).then(function(results) {
        for(let result in results) {
            scheduleArray.push(results[result].dataValues);
        }
        return scheduleArray;
    }).catch(function(err) {
        console.log(err);
    });
}