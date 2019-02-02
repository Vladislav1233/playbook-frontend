import { 
    POST_START_SCHEDULE_TRAINER,
    POST_SUCCESS_SCHEDULE_TRAINER,
    POST_FAILURE_SCHEDULE_TRAINER,
    
    GET_START_SCHEDULE_TRAINER,
    GET_SUCCESS_SCHEDULE_TRAINER,
    GET_FAILURE_SCHEDULE_TRAINER,

    TOGGLE_RESPONSE
} from '../constants/schedule';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
import 'moment/locale/ru';
import uniquePlaygrounds from '../../helpers/uniquePlaygrounds';

const moment = extendMoment(Moment);

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
            // Note: Забронированное подтвержденное время
            const reservedTime = action.reservedResponse.data.data.filter(reservedResponseItem => {
                return reservedResponseItem.status === 1;
            });

            // Note: Инициализация первого диапазона свободного времени
            let rangeSchedule = responseSchedule.length > 0  
                ? [{
                    start_time: responseSchedule[0].start_time,
                    end_time: responseSchedule[0].end_time,
                    isStatus: true
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
                            isStatus: true
                        });
                    };
                }
            });

            // Note: Фильтруем диапазон, чтобы в нём не было свободного времени для "занято" (убираем занятые промежутки из свободного времени)
            const filterRange = () => {
                reservedTime.forEach((itemBusy) => {

                    rangeSchedule.forEach((itemFree, iFree) => {
                        let rangeBusy = moment.range(itemBusy.start_time, itemBusy.end_time);
                        let rangeFree = moment.range(itemFree.start_time, itemFree.end_time);

                        if(rangeBusy.overlaps(rangeFree)) { // Note: если занятое время перекрывает свободное
                            // Note: удаляем занятый диапазон из всего расписания
                            let getRangeWithoutBusy = rangeFree.subtract(rangeBusy);
                            const newRangeScheduleItem = getRangeWithoutBusy.map(getRangeWithoutBusyItem => {
                                return {
                                    start_time: getRangeWithoutBusyItem.start.format('YYYY-MM-DD HH:mm'),
                                    end_time: getRangeWithoutBusyItem.end.format('YYYY-MM-DD HH:mm'),
                                    isStatus: true
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

                const timeRangeCost = moment.range(item.start_time, item.end_time);
                const getTimeOutRange = (indexPostition) => moment(timeRangeCost.toDate()[indexPostition]).format('HH:mm');
 
                return {
                    time: `${getTimeOutRange(0)} - ${getTimeOutRange(1)}`,
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
                bookedTime: uniquePlaygrounds(reservedTime),
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
