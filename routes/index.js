const express = require('express');
const router = express.Router();
const moment = require('moment');
const models = require('../models/');
const buildCalendar = require('../controllers/buildCalendar');
const buildSchedule = require('../controllers/buildSchedule');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


/* GET home page. */
router.get('/', function(req, res, next) {
  let calDate = moment();
  console.log("calDate1: "+String(calDate));

  if(req.cookies.calYear && req.cookies.calMonth && req.cookies.calDate) {
    const calYear = req.cookies.calYear;
    const calMonth = req.cookies.calMonth;
    const calDate2 = req.cookies.calDate;

    calDate = moment().year(calYear).month(calMonth-1).date(calDate2);
    console.log("calDate2: "+String(calDate));
    console.log("쿠키값 저장");
  }

  res.cookie('calYear', String(calDate.year()));
  res.cookie('calMonth', String(calDate.month()+1));
  res.cookie('calDate', String(calDate.date()));
  res.cookie('calDay', String(calDate.locale('ko').format('dddd')));


  const startDate = calDate.clone().startOf('month').format('L');
  const endDate = calDate.clone().endOf('month').format('L');
  const arrayLength = Number(calDate.clone().endOf('month').date())+1;

  let datesArray = buildCalendar.getCalendarArray()

  models.Schedule.findAll({
    raw: true,
    where: {
      fromDate: {
        [Op.between]: ["2019-10-01", "2019-10-30"]
      }
    }
  }).then(function(results) {
    const array = Array(arrayLength).fill(null).map(() => Array());
    for (var result in results) {
      const schedule = results[result];
      const fromOnlyDate = Number(moment(schedule.fromDate).date());
      const toOnlyDate = Number(moment(schedule.toDate).date());
      schedule.fromOnlyDate = fromOnlyDate;
      schedule.toOnlyDate = toOnlyDate;
      array[fromOnlyDate].push(schedule);
    }
    const dailyScheduleArray = array[calDate.date()];
    res.render('index', {datesArray: datesArray, scheduleArray: array, dailyScheduleArray: dailyScheduleArray});
  })
  .catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
