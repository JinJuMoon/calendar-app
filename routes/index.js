const express = require('express');
const router = express.Router();
const moment = require('moment');
const models = require('../models/');
const async = require('async');
const buildCalendar = require('../controllers/buildCalendar');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



// 캘린더 페이지
router.get('/', function(req, res, next) {

    getCalDate(req).then((calDate) => {
        const startDate = calDate.clone().startOf('month').format('YYYY-MM-DD');
        const endDate = calDate.clone().endOf('month').format('YYYY-MM-DD');
        const arrayLength = Number(calDate.clone().endOf('month').date())+1;
        let datesArray = buildCalendar.getCalendarArray(calDate);

        models.Schedule.findAll({
            raw: true,
            where: {
                fromDate: {
                    [Op.between]: [startDate, endDate]
                }
            }
        }).then(function(results) {
            const scheduleArray = Array(arrayLength).fill(null).map(() => Array());
            for (var result in results) {
                const schedule = results[result];
                const fromOnlyDate = Number(moment(schedule.startDisplay).date());
                const toOnlyDate = Number(moment(schedule.endDisplay).date());
                schedule.fromOnlyDate = fromOnlyDate;
                schedule.toOnlyDate = toOnlyDate;
                scheduleArray[fromOnlyDate].push(schedule);
            }
            return scheduleArray;
        })
            .then(function(scheduleArray) {
                const dailyScheduleArray = scheduleArray[calDate.date()];
                res.cookie('calYear', String(calDate.year()));
                res.cookie('calMonth', String(calDate.month()+1));
                res.cookie('calDate', String(calDate.date()));
                res.cookie('calDay', String(calDate.locale('ko').format('dddd')));
                res.render('index', {datesArray: datesArray, scheduleArray: scheduleArray, dailyScheduleArray: dailyScheduleArray});
            })
            .catch(function(err) {
                console.log(err);
            });
    })
});

module.exports = router;


// 쿠키값 읽어오기 & calDate객체에 저장하기
function getCalDate(req) {
    let calDate;

    if (req.cookies.calYear && req.cookies.calMonth && req.cookies.calDate) {

        const calYear = req.cookies.calYear;
        const calMonth = req.cookies.calMonth;
        const calDate2 = req.cookies.calDate;

        calDate = moment().year(calYear).month(calMonth - 1).date(calDate2);

    } else {
        calDate = moment();
    }
    return new Promise((resolve, reject) => {
        resolve(calDate);
    });
}