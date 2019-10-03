const moment = require('moment');

module.exports = {
    getCalendarArray: getCalendarArray
};

function getCalendarArray(calDate) {
    let prevCalDate = calDate.clone().subtract(1, 'months');

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
    let datesArray = [];
    const cnt = dates.length / 7;
    for (let i = 0; i <= cnt; i++) {
        datesArray.push(dates.splice(0, 7));
    }

    return datesArray;
}