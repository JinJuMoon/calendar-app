const moment = require('moment');

module.exports = {
    getPrevDates1: getPrevDates1,
    getNextDates1: getNextDates1,
    getPrevDates2: getPrevDates2,
    getNextDates2: getNextDates2,
    getPresentDatesArray: getPresentDatesArray
};



function getPrevDates1(calDate) {
    let prevCalDate = calDate.clone().subtract(1, 'months');
    const firstDate = calDate.clone().startOf('month');

    let prevDates1 = [];
    let count = firstDate.day();

    if (count > 0) {
        const lastDateOfPreviousMonth = prevCalDate.clone().endOf('month').date();
        for (let i = count - 1; i >= 0; i--) {
            prevDates1.push(lastDateOfPreviousMonth - i);
        }
    }

    return prevDates1;
}


function getNextDates1(calDate) {
    const lastDate = calDate.clone().endOf('month');

    let nextDates1 = [];
    let count = 7 - lastDate.day() - 1;
    if (count > 0) {
        for (let i = 0; i < count; i++) {
            nextDates1.push(1 + i);
        }
    }

    return nextDates1;
}




function getPrevDates2(calDate) {
    const firstDate = calDate.clone().startOf('month');
    const cnt  = 7 - firstDate.day();

    let prevDates2 = [];
    for (let i = 1; i <= cnt; i++) {
        prevDates2.push(i);
    }
    return prevDates2;
}

function getNextDates2(calDate) {
    const lastDate = calDate.clone().endOf('month');
    const cnt = lastDate.day();

    let nextDates2 = [];
    for (let i = cnt; i>=0; i--) {
        nextDates2.push(lastDate.date()-i);
    }
    return nextDates2;
}

function getPresentDatesArray(calDate) {
    const firstDate = calDate.clone().startOf('month');
    const lastDate = calDate.clone().endOf('month');
    const startDate = 7 - firstDate.day() + 1;
    const endDate = lastDate.date() - lastDate.day() - 1;

    let presentDates = [];
    for (let i = startDate; i <= endDate; i++) {
        presentDates.push(i);
    }

    let presentDatesArray = [];
    const cnt = presentDates.length / 7;

    for (let i = 0; i < cnt; i++) {
        presentDatesArray.push(presentDates.splice(0, 7));
    }

    return presentDatesArray;
}
