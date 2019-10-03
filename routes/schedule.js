const express = require('express');
const router = express.Router();
const models = require('../models/');

/* register schedule */
router.post('/register', function(req, res, next) {
    const title = req.body.title===null? "제목없음" : req.body.title;
    const description = req.body.description===null? "  " : req.body.description;
    const fromDate = req.body.fromDate===null? moment().format('L') : req.body.fromDate;
    const fromTime = req.body.fromTime===null? moment("00:00:00") : req.body.fromTime;
    const toDate = req.body.toDate2===null? moment().format('L') : req.body.toDate2;
    const toTime = req.body.toTime===null? moment("00:00:00") : req.body.toTime;
    const isAllday = (req.body.isAllday != null);
    models.Schedule.create({
        title: title,
        description: description,
        fromDate: fromDate,
        fromTime: fromTime,
        toDate: toDate,
        toTime: toTime,
        isAllday: isAllday
    })
    .then(result => {
        console.log("데이터 추가 성공");
        res.redirect("/");
    })
    .catch( err => {
        console.log("데이터 추가 실패");
        console.log(err);
    })
});

module.exports = router;
