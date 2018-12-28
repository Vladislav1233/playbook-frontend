import { 
    POST_START_SCHEDULE_TRAINER,
    POST_SUCCESS_SCHEDULE_TRAINER,
    POST_FAILURE_SCHEDULE_TRAINER,
    
    GET_START_SCHEDULE_TRAINER,
    GET_SUCCESS_SCHEDULE_TRAINER,
    GET_FAILURE_SCHEDULE_TRAINER
} from '../constants/schedule';

import moment from 'moment';
import twix from 'twix';

const initialState = {
    preloader: false,
    scheduleTrainer: {
        date: moment().format('DD.MM.YYYY'),
        nameDay: moment().format('dddd'), 
        schedule: [{
            startTime: '12:00',
            endTime: '14:00',
            status: 'free'
        }, {
            startTime: '14:00',
            endTime: '15:00',
            status: 'busy'
        }],
        cost: [], // TODO
        message: [], // TODO, месседж на каких кортах могу с какого времени, его же и выводить в форме букинга
        list: null
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_START_SCHEDULE_TRAINER:
            return {
                ...state,
                preloader: true
            }
        
        case POST_SUCCESS_SCHEDULE_TRAINER:
            return {
                ...state,
                preloader: false
            }
        
        case POST_FAILURE_SCHEDULE_TRAINER:
            return {
                ...state,
                preloader: false
            }

        case GET_START_SCHEDULE_TRAINER:
            return {
                ...state,
                preloader: true
            }

        case GET_SUCCESS_SCHEDULE_TRAINER:
            console.log(action.payload.data);
            const responseSchedule = action.payload.data;

            const imitationBusy = [{ // удалить потом
                start_time: '2018-12-28 14:00',
                end_time: '2018-12-28 15:00'
            }, {
                start_time: '2018-12-28 17:00',
                end_time: '2018-12-28 18:00'
            }]

            let rangeSchedule = [{
                start: responseSchedule[0].start_time,
                end: responseSchedule[0].end_time
            }];
            console.log(rangeSchedule);

            // Note: получаем дипазоны всего расписания
            responseSchedule.forEach((item, i, arr) => {

                if(arr.length - 1 !== i) {
                    if (rangeSchedule[rangeSchedule.length - 1].end === arr[i + 1].start_time) {
                        rangeSchedule[rangeSchedule.length - 1].end = arr[i + 1].end_time
                    } else {
                        rangeSchedule.push({
                            start: arr[i + 1].start_time,
                            end: arr[i + 1].end_time
                        });
                    };
                }
            });

            // Фильтруем диапазон, чтобы в нём не было свободного времени для "занято"
            imitationBusy.forEach((itemBusy, iBusy, arrBusy) => {

                rangeSchedule.forEach((itemFree, iFree, arrFree) => {
                    let rangeBusy = moment(itemBusy.start_time).twix(itemBusy.end_time);
                    let rangeFree = moment(itemFree.start).twix(itemFree.end);
                    
                    // Note: если занятое время входит в диапазон
                    if( rangeFree.engulfs(rangeBusy) ) {
                        let getRangeWithBusy = rangeFree.xor(rangeBusy);
                        const newRangeScheduleItem = getRangeWithBusy.map(getRangeWithBusyItem => {
                            return {
                                start: getRangeWithBusyItem.start().format('YYYY-MM-DD HH:MM'),
                                end: getRangeWithBusyItem.end().format('YYYY-MM-DD HH:MM')
                            }
                        });
                        rangeSchedule.splice(iFree, 1, ...newRangeScheduleItem);
                    }
                    // console.log(rangeFree.engulfs(rangeBusy));
                });
            });

            var range1 = moment("1982-01-23 8:00").twix("1982-01-23 15:00");
            var range2 = moment("1982-01-23 9:00").twix("1982-01-23 14:00");

            let didi = range1.difference(range2);
            // console.log(didi[0].format(), didi[1].format());

            // const dataAllSchedule = responseSchedule;



            const newScheduleTrainer = action.payload.data ? action.payload.data.map(item => {
                return {
                    idItemScheduleList: `idItemSchedule${item.id}`,
                    startTime: moment(item.start_time).format('HH:mm'),
                    finishTime: moment(item.end_time).format('HH:mm'),
                    status: true, // TODO
                    price: item.price_per_hour,
                    freeCourt: true, // TODO
                    courts: item.playgrounds.map(itemCourt => {
                        return {
                            id: `playgroundId${itemCourt.id}`,
                            name: itemCourt.name,
                            street: itemCourt.address,
                            number: 59,
                            priority: true // TODO
                        }
                    })
                }
            }) : null;

            return {
                ...state,
                preloader: false,
                scheduleTrainer: {
                    ...state.scheduleTrainer,
                    date: moment(action.date).format('DD.MM.YYYY'),
                    nameDay: moment(action.date).format('dddd'), // TODO: сделать перевод на русский
                    list: newScheduleTrainer
                }
            }

        case GET_FAILURE_SCHEDULE_TRAINER:
            return {
                ...state,
                preloader: false
            }

        default:
            return state;
    }
}
