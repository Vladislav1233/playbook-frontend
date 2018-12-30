import { 
    POST_START_SCHEDULE_TRAINER,
    POST_SUCCESS_SCHEDULE_TRAINER,
    POST_FAILURE_SCHEDULE_TRAINER,
    
    GET_START_SCHEDULE_TRAINER,
    GET_SUCCESS_SCHEDULE_TRAINER,
    GET_FAILURE_SCHEDULE_TRAINER
} from '../constants/schedule';

import moment from 'moment';
import 'moment/locale/ru';
import twix from 'twix';

const initialState = {
    preloader: false,
    scheduleTrainer: {
        date: moment().format('DD.MM.YYYY'),
        nameDay: moment().format('dddd'), 
        schedule: [],
        cost: [], // TODO
        message: [] // TODO, месседж на каких кортах могу с какого времени, его же и выводить в форме букинга
    },
    busyTime: []
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
            
            // Note: Инициализация первого диапазона времени
            let rangeSchedule = [{
                startTime: responseSchedule[0].start_time,
                endTime: responseSchedule[0].end_time,
                status: true
            }];
            console.log(rangeSchedule);

            // Note: получаем дипазоны всего расписания
            responseSchedule.forEach((item, i, arr) => {

                if(arr.length - 1 !== i) {
                    // Note: если следующий объект времени идет следом за предыдущим, то объеденяем диапазоны в один
                    if (rangeSchedule[rangeSchedule.length - 1].endTime === arr[i + 1].start_time) {
                        rangeSchedule[rangeSchedule.length - 1].endTime = arr[i + 1].end_time
                    } else { // Note: Или создаем новый диапазон (разрыв после предыдущего)
                        rangeSchedule.push({
                            startTime: arr[i + 1].start_time,
                            endTime: arr[i + 1].end_time,
                            status: true
                        });
                    };
                }
            });

            // Note: Фильтруем диапазон, чтобы в нём не было свободного времени для "занято" (убираем занятые промежутки из свободного времени)
            imitationBusy.forEach((itemBusy) => {

                rangeSchedule.forEach((itemFree, iFree) => {
                    let rangeBusy = moment(itemBusy.start_time).twix(itemBusy.end_time);
                    let rangeFree = moment(itemFree.startTime).twix(itemFree.endTime);
                    
                    // Note: если занятое время входит в диапазон
                    if( rangeFree.engulfs(rangeBusy) ) {
                        let getRangeWithoutBusy = rangeFree.xor(rangeBusy);
                        const newRangeScheduleItem = getRangeWithoutBusy.map(getRangeWithoutBusyItem => {
                            return {
                                startTime: getRangeWithoutBusyItem.start().format('YYYY-MM-DD HH:mm'),
                                endTime: getRangeWithoutBusyItem.end().format('YYYY-MM-DD HH:mm'),
                                status: true
                            }
                        });
                        rangeSchedule.splice(iFree, 1, ...newRangeScheduleItem);
                    }
                });
            });
            
            // Получаем стоимость часа во всех промежутках времени
            const newCost = responseSchedule ? responseSchedule.map(item => {
                return {
                    time: moment(item.start_time).twix(item.end_time).format({hideDate: true}),
                    cost: item.price_per_hour
                }
            }) : [];

            console.log(newCost);

            return {
                ...state,
                preloader: false,
                scheduleTrainer: {
                    ...state.scheduleTrainer,

                    date: moment(action.date).format('DD.MM.YYYY'),
                    nameDay: moment(action.date).format('dddd'), // TODO: сделать перевод на русский
                    schedule: rangeSchedule,
                    cost: newCost
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
