const express = require('express');
const router = express.Router();
const models = require('../models/');
const moment = require('moment');

// 일정 등록하기
router.post('/register', function(req, res, next) {
    const title = req.body.title;
    const description = req.body.description;
    const fromDate = req.body.fromDate;
    const fromTime = req.body.fromTime;
    const toDate = req.body.toDate2;
    const toTime = req.body.toTime;
    const isAllday = Boolean(req.body.isAllday);
    const startDisplay = fromDate;
    const endDisplay = toDate;

    const dateSpan = moment.duration(moment(toDate).diff(moment(fromDate))).days() + 1;
    const possibleSpan = 7-moment(fromDate).day();

    if( (dateSpan - possibleSpan) > 7 ) {
        const n = Math.floor( (dateSpan - possibleSpan) / 7 );
        const endDisplay2 = req.body.toDate2;
        const endDisplay = moment(fromDate).add(possibleSpan-1, 'days').format('L');
        const startDisplay2 = moment(fromDate).add(possibleSpan+(n*7), 'days').format('L');

        models.Schedule.create({
            title: title,
            description: description,
            fromDate: fromDate,
            fromTime: fromTime,
            toDate: toDate,
            toTime: toTime,
            isAllday: isAllday,
            startDisplay: startDisplay,
            endDisplay: endDisplay,
            isConsecutive: true
        })
            .then(result => {
                console.log("데이터 추가 성공");
            })
            .catch( err => {
                console.log("데이터 추가 실패");
                console.log(err);
            });


        for(let i=0; i<n; i++) {
            let startDisplays = moment(fromDate).add(possibleSpan+(i*7), 'days').format('L');
            let endDisplays = moment(fromDate).add(possibleSpan+(i*7)+6 , 'days').format('L');

            models.Schedule.create({
                title: title,
                description: description,
                fromDate: fromDate,
                fromTime: fromTime,
                toDate: toDate,
                toTime: toTime,
                isAllday: isAllday,
                startDisplay: startDisplays,
                endDisplay: endDisplays,
                isConsecutive: true
            })
                .then(result => {
                    console.log("데이터 추가 성공");
                })
                .catch( err => {
                    console.log("데이터 추가 실패");
                    console.log(err);
                });
        }

        models.Schedule.create({
            title: title,
            description: description,
            fromDate: fromDate,
            fromTime: fromTime,
            toDate: toDate,
            toTime: toTime,
            isAllday: isAllday,
            startDisplay: startDisplay2,
            endDisplay: endDisplay2,
            isConsecutive: true
        })
            .then(result => {
                console.log("데이터 추가 성공");
                res.redirect("/");
            })
            .catch( err => {
                console.log("데이터 추가 실패");
                console.log(err);
            });


    } else if( dateSpan > possibleSpan ) {

        const endDisplay2 = req.body.toDate2;
        const endDisplay = moment(fromDate).add(possibleSpan-1, 'days').format('L');
        const startDisplay2 = moment(fromDate).add(possibleSpan, 'days').format('L');


        models.Schedule.create({
            title: title,
            description: description,
            fromDate: fromDate,
            fromTime: fromTime,
            toDate: toDate,
            toTime: toTime,
            isAllday: isAllday,
            startDisplay: startDisplay,
            endDisplay: endDisplay,
            isConsecutive: true
        })
        .then(result => {
            console.log("데이터 추가 성공");
        })
        .catch( err => {
            console.log("데이터 추가 실패");
            console.log(err);
        });

        models.Schedule.create({
            title: title,
            description: description,
            fromDate: fromDate,
            fromTime: fromTime,
            toDate: toDate,
            toTime: toTime,
            isAllday: isAllday,
            startDisplay: startDisplay2,
            endDisplay: endDisplay2,
            isConsecutive: true
        })
        .then(result => {
            console.log("데이터 추가 성공");
            res.redirect("/");
        })
        .catch( err => {
            console.log("데이터 추가 실패");
            console.log(err);
        });

    } else {
        models.Schedule.create({
            title: title,
            description: description,
            fromDate: fromDate,
            fromTime: fromTime,
            toDate: toDate,
            toTime: toTime,
            isAllday: isAllday,
            startDisplay: startDisplay,
            endDisplay: endDisplay,
            isConsecutive: false
        })
        .then(result => {
            console.log("데이터 추가 성공");
            res.redirect("/");
        })
        .catch( err => {
            console.log("데이터 추가 실패");
            console.log(err);
        })
    }
});

module.exports = router;
