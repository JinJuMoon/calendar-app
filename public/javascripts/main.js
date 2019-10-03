$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(function () {
    $('#view li:first-child a').tab('show')
});

$(function () {
    $('[data-toggle="popover"]').popover().on('inserted.bs.popover')
});


$('.week, .daily-calendar').click(function() {
    $('#registerSchedule').modal('show');
});

$(".event-consecutive, .event, .event-repeated").click(function(event) {
    event.stopPropagation();
});



$(function () {
    $('#datetimepicker1').datetimepicker({
        format: 'L'
    });
    $('#datetimepicker3').datetimepicker({
        format: 'L'
    });
});

$(function () {
    $('#datetimepicker2').datetimepicker({
        format: 'HH:mm',
        pick12HourFormat: false
    });
    $('#datetimepicker4').datetimepicker({
        format: 'HH:mm',
        pick12HourFormat: false
    });
});

var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

var setCookie = function(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

var deleteCookie = function(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
};




$( function() {
    const calYear = getCookie('calYear');
    const calMonth = getCookie('calMonth');
    const calDate = getCookie('calDate');
    const calDay = getCookie('calDay');

    $('#cal-month').html(calYear+"년 "+calMonth+"월");
    $('#cal-date').html(calDate+"일 "+decodeURI(calDay));
    $('#prevMonth').click(function() {
        if(calMonth === '1') {
            console.log('1');
            setCookie('calYear', calYear-1, 1);
            setCookie('calMonth', 12);
            window.location.reload();
        } else {
            setCookie('calMonth', calMonth-1,1);
            window.location.reload();
        }
    });
    $('#nextMonth').click(function() {
        if(calMonth === '12') {
            setCookie('calYear', calYear+1, 1);
            setCookie('calMonth', 1);
            window.location.reload();
        } else {
            setCookie('calMonth', calMonth+1, 1);
            window.location.reload();
        }
    });
    $('#today').click(function() {
        deleteCookie('calYear');
        deleteCookie('calMonth');
        deleteCookie('calDate');
        deleteCookie('calDay');
        window.location.reload();
    });
});
