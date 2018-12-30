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
    bookedTime: [],
    scheduleTrainer: {
        date: moment().format('DD.MM.YYYY'),
        nameDay: moment().format('dddd'), 
        schedule: [],
        cost: [], // TODO
        message: [] // TODO, месседж на каких кортах могу с какого времени, его же и выводить в форме букинга
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

            // const imitationBusy = [{ // удалить потом
            //     start_time: '2018-12-28 14:00',
            //     end_time: '2018-12-28 15:00'
            // }, {
            //     start_time: '2018-12-28 17:00',
            //     end_time: '2018-12-28 18:00'
            // }]
            
            // Note: Инициализация первого диапазона времени
            let rangeSchedule = responseSchedule.length > 0  
                ? [{
                    start_time: responseSchedule[0].start_time,
                    end_time: responseSchedule[0].end_time,
                    status: true
                }] : [];

            // Note: получаем дипазоны всего расписания
            responseSchedule.forEach((item, i, arr) => {

                if(arr.length - 1 !== i) {
                    // Note: если следующий объект времени идет следом за предыдущим, то объеденяем диапазоны в один
                    if (rangeSchedule[rangeSchedule.length - 1].end_time === arr[i + 1].start_time) {
                        rangeSchedule[rangeSchedule.length - 1].end_time = arr[i + 1].end_time
                    } else { // Note: Или создаем новый диапазон (разрыв после предыдущего)
                        rangeSchedule.push({
                            start_time: arr[i + 1].start_time,
                            end_time: arr[i + 1].end_time,
                            status: true
                        });
                    };
                }
            });

            // Note: Фильтруем диапазон, чтобы в нём не было свободного времени для "занято" (убираем занятые промежутки из свободного времени)
            const filterRange = () => {
                responseSchedule.confirmed_bookings.forEach((itemBusy) => {

                    rangeSchedule.forEach((itemFree, iFree) => {
                        let rangeBusy = moment(itemBusy.start_time).twix(itemBusy.end_time);
                        let rangeFree = moment(itemFree.start_time).twix(itemFree.end_time);
                        
                        // Note: если занятое время входит в диапазон
                        if( rangeFree.engulfs(rangeBusy) ) {
                            let getRangeWithoutBusy = rangeFree.xor(rangeBusy);
                            const newRangeScheduleItem = getRangeWithoutBusy.map(getRangeWithoutBusyItem => {
                                return {
                                    start_time: getRangeWithoutBusyItem.start().format('YYYY-MM-DD HH:mm'),
                                    end_time: getRangeWithoutBusyItem.end().format('YYYY-MM-DD HH:mm'),
                                    status: true
                                }
                            });
                            rangeSchedule.splice(iFree, 1, ...newRangeScheduleItem);
                        }
                    });
                });
            };
            responseSchedule.confirmed_bookings ? filterRange() : false;
            
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
                bookedTime: responseSchedule.confirmed_bookings ? responseSchedule.confirmed_bookings : [],
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
