$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(function () {
    $('[data-toggle="popover"]').popover().on('inserted.bs.popover')
});



$('.week, .daily-calendar').click(function() {
    $('#registerSchedule').modal('show');
});


$(function() {
    $("#isAllday").change(function(){
        if ($('#isAllday').is(":checked")) {
            $('#fromTime').attr('disabled', true);
            $('#toTime').attr('disabled', true);
        } else {
            $('#fromTime').attr('disabled', false);
            $('#toTime').attr('disabled', false);
        }
    });
});


$(".event-consecutive, .event, .event-repeated").click(function(event) {
    event.stopPropagation();
});



$(function () {
    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#datetimepicker3').datetimepicker({
        format: 'YYYY-MM-DD'
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




// 일정 등록시 날짜 및 시간 유효성 검사

$('#registerForm').on('submit', function(e) {

    let title = $('#title').val();
    let description = $('#description').val();
    let fromDate = $('#fromDate').val();
    let toDate = $('#toDate').val();
    let fromTime = $('#fromTime').val();
    let toTime = $('#toTime').val();

    if (title==="") {
        alert("일정 제목을 입력해주세요.");
        e.preventDefault();
    } else if (description==="") {
        alert("일정 설명을 입력해주세요.");
        e.preventDefault();
    } else if (fromDate==="") {
        alert("일정 시작 날짜를 입력해주세요.");
        e.preventDefault();
    } else if (toDate==="") {
        alert("일정 종료 날짜를 입력해주세요.");
        e.preventDefault();
    } else if( moment(fromDate).isAfter(moment(toDate))) {
        alert("일정 종료 날짜가 일정 시작 날짜보다 이전입니다.");
        e.preventDefault();
    }else if( moment(fromTime).isAfter(moment(toTime))) {
        alert("일정 종료 시간이 일정 시작 시간보다 이전입니다.");
        e.preventDefault();
    }
});



// // 일정 등록시 입력값 유효성 검사
//
// $(function() {
//     $('#registerForm').validate({
//         rules: {
//             title: {required: true},
//             description: {required: true},
//         },
//         messages: {
//             title: {required: "일정 제목을 입력해주세요."},
//             description: {required: "일정 설명을 입력해주세요."},
//         }
//     })
// });



// 쿠키 읽어오기, 설정하기, 삭제하기

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



let calYear = Number(getCookie('calYear'));
let calMonth = Number(getCookie('calMonth'));
let calDate = Number(getCookie('calDate'));
let calDay = getCookie('calDay');
let momentDate = moment().year(calYear).month(calMonth-1).date(calDate);



// 달력 날짜 이동

$( function() {

    $('#cal-month').html(calYear+"년 "+calMonth+"월");
    $('#cal-date').html(calYear+"년 "+calMonth+"월 "+calDate+"일 "+decodeURI(calDay));
    $('#today').click(function() {
        deleteCookie('calYear');
        deleteCookie('calMonth');
        deleteCookie('calDate');
        deleteCookie('calDay');
        window.location.reload();
    });
    $('#prevMonth').click(function() {
        if(calMonth === '1') {
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
    $('#prevDate').click(function() {
        if(calDate === '1') {
            momentDate.subtract(1, 'days');
            calYear = Number(momentDate.year());
            calMonth = Number(momentDate.month()+1);
            calDate = Number(momentDate.date());
            setCookie('calYear', calYear, 1);
            setCookie('calMonth', calMonth, 1);
            setCookie('calDate', calDate, 1);
            window.location.reload();
        } else {
            setCookie('calDate', calDate-1,1);
            window.location.reload();
        }
    });
    $('#nextDate').click(function() {
        momentDate.add(1, 'days');
        calYear = Number(momentDate.year());
        calMonth = Number(momentDate.month()+1);
        calDate = Number(momentDate.date());
        setCookie('calYear', calYear, 1);
        setCookie('calMonth', calMonth, 1);
        setCookie('calDate', calDate, 1);
        window.location.reload();
    });
});
