const moment = require('moment');

let calDate = moment();
let prevCalDate = calDate.clone().subtract(1, 'months');

module.exports = {
    getCalendarArray: getCalendarArray,
    goPrevMonth: goPrevMonth,
    goNextMonth: goNextMonth,
    goToday: goToday
};


function getCalendarArray() {
    // $("#cal-month").html(calDate.locale('ko').format('YYYY MMMM'));

    const firstDate = calDate.clone().startOf('month');
    const lastDate = calDate.clone().endOf('month');

    let prevDates = [];
    let count = firstDate.day();

    if (count > 0) {
        const lastDateOfPreviousMonth = prevCalDate.clone().endOf('month').date();
        for (let i = count - 1; i >= 0; i--) {
            prevDates.push(lastDateOfPreviousMonth - i);
        }
    }


    let nextDates = [];
    count = 7 - lastDate.day() - 1;
    if (count > 0) {
        for (let i = 0; i < count; i++) {
            nextDates.push(1 + i);
        }
    }

    let presentDates = [];
    for (let i = 1; i <= lastDate.date(); i++) {
        presentDates.push(i);
    }

    let dates = prevDates.concat(presentDates).concat(nextDates);
    let datesArray = dates.division(7);

    return datesArray;

    // $(".weeks").html("    ");
    //
    // for(let i=0; i<dates.length;i++){
    //     if(i%7 == 0){
    //         $(".weeks").append("<div class=\"week week"+(i%7+1)+"\">");
    //     }
    //     $(".week:last").append("<div class=\"day day"+dates[i]+"\"><h3 class=\"day-label\">"+dates[i]+"</h3></div>");
    //
    //     if(i%7 === 6){
    //         $(".weeks").append("</div>");
    //     }
    // }
}

function goPrevMonth() {
    calDate.subtract(1, 'months');
    getCalendarArray();
}

function goNextMonth() {
    calDate.add(1, 'months');
    getCalendarArray();
}

function goToday() {
    calDate = moment();
    getCalendarArray();
}

Array.prototype.division = function (n) {
    var arr = this;
    var len = arr.length;
    var cnt = Math.floor(len / n);
    var tmp = [];

    for (var i = 0; i <= cnt; i++) {
        tmp.push(arr.splice(0, n));
    }

    return tmp;
}