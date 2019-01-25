import { 
    POST_START_SCHEDULE_TRAINER,
    POST_SUCCESS_SCHEDULE_TRAINER,
    POST_FAILURE_SCHEDULE_TRAINER,
    
    GET_START_SCHEDULE_TRAINER,
    GET_SUCCESS_SCHEDULE_TRAINER,
    GET_FAILURE_SCHEDULE_TRAINER,

    TOGGLE_RESPONSE
} from '../constants/schedule';

import moment from 'moment';
import 'moment/locale/ru';
// eslint-disable-next-line
import twix from 'twix';
import uniquePlaygrounds from '../../helpers/uniquePlaygrounds';

const initialState = {
    preloader: false,
    bookedTime: [],
    playgroundsForTraining: [],
    scheduleTrainer: {
        date: moment().format('DD.MM.YYYY'),
        nameDay: moment().format('dddd'), 
        schedule: [],
        cost: [],
        message: [] // TODO, месседж на каких кортах могу с какого времени, его же и выводить в форме букинга
    },
    successPostResponse: false
}

export default function(state = initialState, action) {
    switch (action.type) {

        case TOGGLE_RESPONSE: 
            return {
                ...state,
                successPostResponse: false
            }

        case POST_START_SCHEDULE_TRAINER:
            return {
                ...state,
                preloader: true
            }
        
        case POST_SUCCESS_SCHEDULE_TRAINER:
            return {
                ...state,
                preloader: false,
                successPostResponse: action.payload.data.success
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
            const responseSchedule = action.payload.data;
            
            // Note: Инициализация первого диапазона времени
            let rangeSchedule = responseSchedule.length > 0  
                ? [{
                    start_time: responseSchedule[0].start_time,
                    end_time: responseSchedule[0].end_time,
                    status: true
                }] : [];
            
            // Note: массив, в который буду собирать всё занятое время
            let reservedTime = [];

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
                // Note: собираю занятое время в массив со всех карточек
                reservedTime.push(...item.confirmed_bookings);
            });

            // Note: Фильтруем диапазон, чтобы в нём не было свободного времени для "занято" (убираем занятые промежутки из свободного времени)
            const filterRange = () => {
                reservedTime.forEach((itemBusy) => {

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
            // eslint-disable-next-line
            reservedTime.length > 0 ? filterRange() : false;
            
            // Получаем стоимость часа во всех промежутках времени
            const newCost = responseSchedule ? responseSchedule.map(item => {
                return {
                    time: moment(item.start_time).twix(item.end_time).format({hideDate: true}),
                    cost: item.price_per_hour
                }
            }) : [];

            // Note: получаем площадки на которых в этот день тренирует тренер
            let arrayPlaygrounds = [];
            responseSchedule.forEach(item => {
                arrayPlaygrounds.push(...item.playgrounds);
            });
            const newPlaygroundsForTraining = uniquePlaygrounds(arrayPlaygrounds);

            return {
                ...state,
                preloader: false,
                bookedTime: responseSchedule.confirmed_bookings ? responseSchedule.confirmed_bookings : [],
                playgroundsForTraining: newPlaygroundsForTraining,
                scheduleTrainer: {
                    ...state.scheduleTrainer,
                    date: moment(action.date).format('DD.MM.YYYY'),
                    nameDay: moment(action.date).format('dddd'),
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
