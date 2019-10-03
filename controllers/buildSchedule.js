// const moment = require('moment');
// const models = require('../models/');
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;
//
//
// const calDate = moment();
// const startDate = calDate.clone().startOf('month').format('L');
// const endDate = calDate.clone().endOf('month').format('L');
//
// module.exports = {
//     getScheduleArray: getScheduleArray
// };
//
//
// function getScheduleArray(calDate) {
//     console.log(calDate);
//     const startDate = calDate.clone().startOf('month').format('YYYY-MM-DD');
//     const endDate = calDate.clone().endOf('month').format('YYYY-MM-DD');
//     const arrayLength = Number(calDate.clone().endOf('month').date()) + 1;
//     const array = Array(arrayLength).fill(null).map(() => Array());
//
//     console.log("start : "+startDate);
//     console.log("end : "+endDate);
//
//     models.Schedule.findAll({
//         raw: true,
//         where: {
//             fromDate: {
//                 [Op.between]: [startDate, endDate]
//             }
//         }
//     }).then(function (results) {
//         for (var result in results) {
//             const schedule = results[result];
//             const fromOnlyDate = Number(moment(schedule.fromDate).date());
//             const toOnlyDate = Number(moment(schedule.toDate).date());
//             schedule.fromOnlyDate = fromOnlyDate;
//             schedule.toOnlyDate = toOnlyDate;
//             array[fromOnlyDate].push(schedule);
//         }
//     })
//     .then(function() {
//         console.log("array1");
//         console.log(array);
//         return new Promise(function(resolve) {
//             resolve(array);
//         });
//     })
//     .catch(function (err) {
//         console.log(err);
//     });
// }
//
//
// //
// // async function getScheduleArray(calDate) {
// //     try {
// //         const startDate = await calDate.clone().startOf('month').format('L');
// //         const endDate = await calDate.clone().endOf('month').format('L');
// //         const arrayLength = await Number(calDate.clone().endOf('month').date()) + 1;
// //
// //         await models.Schedule.findAll({
// //             raw: true,
// //             where: {
// //                 fromDate: {
// //                     [Op.between]: [startDate, endDate]
// //                 }
// //             }
// //         }).then(function (results) {
// //             const array = Array(arrayLength).fill(null).map(() => Array());
// //             for (var result in results) {
// //                 const schedule = results[result];
// //                 const fromOnlyDate = Number(moment(schedule.fromDate).date());
// //                 const toOnlyDate = Number(moment(schedule.toDate).date());
// //                 schedule.fromOnlyDate = fromOnlyDate;
// //                 schedule.toOnlyDate = toOnlyDate;
// //                 array[fromOnlyDate].push(schedule);
// //             }
// //             return array;
// //         })
// //             .catch(function (err) {
// //                 console.log(err);
// //             });
// //     }
// //     catch(e) {
// //         console.log("에러발생");
// //         console.log(e);
// //     }
// // }