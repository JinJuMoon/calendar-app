const express = require('express');
const router = express.Router();
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const models = require('../models/');
const buildCalendar = require('../controllers/buildCalendar');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// 먼슬리 뷰
router.get('/', function(req, res, next) {

    getCalDate(req).then((calDate) => {
        let prevDates1 = buildCalendar.getPrevDates1(calDate);
        let nextDates1 = buildCalendar.getNextDates1(calDate);
        let prevDates2 = buildCalendar.getPrevDates2(calDate);
        let nextDates2 = buildCalendar.getNextDates2(calDate);
        const endDate1 = calDate.clone().subtract(1, 'months').endOf('month');
        const startDate1 = endDate1.clone().subtract(endDate1.day(), 'days');
        const startDate2 = calDate.clone().startOf('month');
        const endDate2 = calDate.clone().endOf('month');
        const startDate3 = calDate.clone().add(1, 'months').startOf('month');
        const endDate3 = startDate3.clone().add(6-startDate3.day(), 'days');
        const arrayLength = Number(calDate.clone().endOf('month').date())+1;

        let presentDatesArray = buildCalendar.getPresentDatesArray(calDate);
        const scheduleArray1 = Array(arrayLength).fill(null).map(() => Array());
        const scheduleArray2 = Array(arrayLength).fill(null).map(() => Array());
        const scheduleArray3 = Array(arrayLength).fill(null).map(() => Array());





        Promise.all([

            models.Schedule.findAll({
                raw: true,
                where: {}
            }).then(function(results) {

                let length = endDate1.day()+1;
                let indexDate = startDate1.clone().subtract(1, 'days');
                for (let i=0; i<length; i++) {
                    indexDate.add(1, 'days');
                    for(var j in results) {
                        const schedule = results[j];
                        const t1 = moment(schedule.startDisplay).startOf('day');
                        const t2 = moment(schedule.endDisplay).endOf('day');
                        const range = moment.range(t1,t2);
                        if (range.contains(indexDate)) {
                            const index = Number(indexDate.date());
                            const t1 = moment(schedule.fromDate);
                            const t2 = moment(schedule.toDate);
                            schedule.period = moment.duration(t2.diff(t1)).days() + 1;
                            schedule.startOnlyDay = Number(moment(schedule.startDisplay).day());
                            schedule.endOnlyDay = Number(moment(schedule.endDisplay).day());
                            results[j] = "";
                            scheduleArray1[index].push(schedule);
                        }
                    }
                }
                return scheduleArray1;

            }).catch(function(err) {
                console.log(err);
            }),


            models.Schedule.findAll({
                raw: true,
                where: {}
            }).then(function(results) {

                let length = endDate2.date();
                let indexDate = endDate1.clone();
                for (let i=0; i<length; i++) {
                    indexDate.add(1, 'days');
                    for(var j in results) {
                        const schedule = results[j];
                        const t1 = moment(schedule.startDisplay);
                        const t2 = moment(schedule.endDisplay).endOf('day');
                        const range = moment.range(t1,t2);
                        if (range.contains(indexDate)) {
                            const index = Number(indexDate.date());
                            const t1 = moment(schedule.fromDate);
                            const t2 = moment(schedule.toDate);
                            schedule.period = moment.duration(t2.diff(t1)).days() + 1;
                            schedule.startOnlyDay = Number(moment(schedule.startDisplay).day());
                            schedule.endOnlyDay = Number(moment(schedule.endDisplay).day());
                            results[j] = "";
                            scheduleArray2[index].push(schedule);
                        }
                    }
                }
                return scheduleArray2;

            }).catch(function(err) {
                console.log(err);
            }),


            models.Schedule.findAll({
                raw: true,
                where: {
                    startDisplay: { [Op.between]: [startDate3.format('YYYY-MM-DD'), endDate3.format('YYYY-MM-DD')] }

                }
            }).then(function(results) {

                let length = 7-startDate3.day();
                let indexDate = startDate3.clone().subtract(1, 'days');
                for (let i=0; i<length; i++) {
                    indexDate.add(1, 'days');
                    for(var j in results) {
                        const schedule = results[j];
                        const t1 = moment(schedule.startDisplay);
                        const t2 = moment(schedule.endDisplay).endOf('day');
                        const range = moment.range(t1,t2);
                        if (range.contains(indexDate)) {
                            const index = Number(indexDate.date());
                            const t1 = moment(schedule.fromDate);
                            const t2 = moment(schedule.toDate);
                            schedule.period = moment.duration(t2.diff(t1)).days() + 1;
                            schedule.startOnlyDay = Number(moment(schedule.startDisplay).day());
                            schedule.endOnlyDay = Number(moment(schedule.endDisplay).day());
                            results[j] = "";
                            scheduleArray3[index].push(schedule);
                        }
                    }
                }
                return scheduleArray3;

            }).catch(function(err) {
                console.log(err);
            })


        ]).then( r => {
            res.cookie('calYear', String(calDate.year()));
            res.cookie('calMonth', String(calDate.month()+1));
            res.cookie('calDate', String(calDate.date()));
            res.cookie('calDay', String(calDate.locale('ko').format('dddd')));
            res.render('monthly', {prevDates1: prevDates1, nextDates1: nextDates1, prevDates2: prevDates2, nextDates2: nextDates2, presentDatesArray: presentDatesArray, scheduleArray1: r[0], scheduleArray2: r[1], scheduleArray3: r[2]});
        });
    })
});

// 데일리 뷰
router.get('/daily', function(req, res, next) {

    getCalDate(req).then((calDate) => {

        models.Schedule.findAll({
            raw: true,
            where: {}
        }).then(function(results) {
            const dailyScheduleArray = [];

            for (var i in results) {
                const schedule = results[i];
                const t1 = moment(schedule.fromDate);
                const t2 = moment(schedule.toDate);
                const range = moment.range(t1,t2.endOf('day'));
                if(range.contains(calDate)) {
                    schedule.period = moment.duration(t2.diff(t1)).days() + 1;
                    schedule.startOnlyDay = Number(moment(schedule.startDisplay).day());
                    schedule.endOnlyDay = Number(moment(schedule.endDisplay).day());
                    schedule.startOnlyDate = Number(moment(schedule.startDisplay).date());;
                    schedule.endOnlyDate = Number(moment(schedule.endDisplay).date());
                    results[i] = "";
                    dailyScheduleArray.push(schedule);
                }
            }
            return dailyScheduleArray;
        })
            .then(function(dailyScheduleArray) {
                res.cookie('calYear', String(calDate.year()));
                res.cookie('calMonth', String(calDate.month()+1));
                res.cookie('calDate', String(calDate.date()));
                res.cookie('calDay', String(calDate.locale('ko').format('dddd')));
                res.render('daily', {dailyScheduleArray: dailyScheduleArray});
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