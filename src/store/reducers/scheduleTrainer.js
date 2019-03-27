import { 
    POST_START_SCHEDULE_TRAINER,
    POST_SUCCESS_SCHEDULE_TRAINER,
    POST_FAILURE_SCHEDULE_TRAINER,
    
    GET_START_SCHEDULE_TRAINER,
    GET_SUCCESS_SCHEDULE_TRAINER,
    GET_FAILURE_SCHEDULE_TRAINER,

    DECLINE_CONFIRM_BOOKING_START,
    DECLINE_CONFIRM_BOOKING_SUCCESS,
    DECLINE_CONFIRM_BOOKING_FAILURE,

    EDIT_START_SCHEDULE_TRAINER,
    EDIT_SUCCESS_SCHEDULE_TRAINER,
    EDIT_FAILURE_SCHEDULE_TRAINER
} from '../constants/schedule';

import { ANALIZE_DATE_TIME_ZONE } from '../constants/formatDates'; 
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import 'moment/locale/ru';
import uniquePlaygrounds from '../../helpers/uniquePlaygrounds';

const moment = extendMoment(Moment);

// Note: moment просит указывать формат входящей даты, чтобы анализировать его и нормально парсить во всех браузерах
const analizeDateTimeZone = ANALIZE_DATE_TIME_ZONE;

const initialState = {
    preloader: false,
    bookedTime: [],
    playgroundsForTraining: [],
    scheduleTrainer: {
        date: moment(),
        nameDay: moment().format('dddd'), 
        schedule: [],
        cost: [],
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

        case GET_SUCCESS_SCHEDULE_TRAINER: {
            const responseSchedule = action.payload.data;
            // Note: Забронированное подтвержденное время
            let reservedTime = [];

            if (action.isCabinet) {
                reservedTime = action.reservedResponse.data.data.filter(reservedResponseItem => {
                    return reservedResponseItem.status === 1;
                });
            }
            console.log(action.isCabinet)
            // console.log(action.reservedResponse.data)
            // Note: Cтоимость часа во всех промежутках времени
            let newCost = [];
            // Note: Площадки на которых в этот день тренирует тренер
            let arrayPlaygrounds = [];

            // Note: Инициализация первого диапазона свободного времени
            let rangeSchedule = responseSchedule.length > 0  
                ? [{
                    start_time: responseSchedule[0].start_time,
                    end_time: responseSchedule[0].end_time,
                    isStatus: true
                }] : [];

            // Note: Обходим массив ответа с расписанием тренера, чтобы собрать все данные
            responseSchedule.forEach((item, i, arr) => {

                // Note: Получаем дипазоны всего расписания
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
                    }
                }

                // Note: Получаем стоимость часа во всех промежутках времени для тренера. Время переводим в локальный часовой пояс (с сервера нам приходит +00:00).
                const timeRangeCost = moment.range(
                    moment(item.start_time, analizeDateTimeZone), 
                    moment(item.end_time, analizeDateTimeZone)
                );
                newCost.push({
                    time: timeRangeCost,
                    cost: item.price_per_hour
                });
                
                // Note: получаем площадки на которых в этот день тренирует тренер
                arrayPlaygrounds.push(...item.playgrounds);

                // Note: получаем занятое время из расписания тренера
                if(!action.isCabinet) {
                    reservedTime = reservedTime.concat(item.confirmed_bookings);
                }
            });


            // Note: Фильтруем диапазон, чтобы в нём не было свободного времени для "занято" (убираем занятые промежутки из свободного времени)
            const filterRange = () => {
                reservedTime.forEach((itemBusy) => {

                    rangeSchedule.forEach((itemFree, iFree) => {
                        let rangeBusy = moment.range(
                            moment(itemBusy.start_time, analizeDateTimeZone), 
                            moment(itemBusy.end_time, analizeDateTimeZone)
                        );
                        let rangeFree = moment.range(
                            moment(itemFree.start_time, analizeDateTimeZone), 
                            moment(itemFree.end_time, analizeDateTimeZone)
                        );

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
            if(reservedTime.length > 0) {
                filterRange();
            }
            console.log(reservedTime)

            const newPlaygroundsForTraining = uniquePlaygrounds(arrayPlaygrounds);

            const momentTimeFromAction = moment(`${action.date} +00:00`, analizeDateTimeZone);

            return {
                ...state,
                preloader: false,
                bookedTime: uniquePlaygrounds(reservedTime),
                playgroundsForTraining: newPlaygroundsForTraining,
                scheduleTrainer: {
                    ...state.scheduleTrainer,
                    date: momentTimeFromAction,
                    nameDay: momentTimeFromAction.format('dddd'),
                    schedule: rangeSchedule,
                    cost: newCost
                }
            }
        }

        case GET_FAILURE_SCHEDULE_TRAINER:
            return {
                ...state,
                preloader: false
            }

        case DECLINE_CONFIRM_BOOKING_START:
            return {
                ...state,
                preloader: true
            }

        case DECLINE_CONFIRM_BOOKING_SUCCESS:
            return {
                ...state
            }

        case DECLINE_CONFIRM_BOOKING_FAILURE:
            return {
                ...state,
                preloader: false
            }

        case EDIT_START_SCHEDULE_TRAINER:
            return {
                ...state,
                preloader: true
            }

        case EDIT_SUCCESS_SCHEDULE_TRAINER:
            return {
                ...state,
                preloader: false
            }
        
        case EDIT_FAILURE_SCHEDULE_TRAINER:
            return {
                ...state,
                preloader: false
            }

        default:
            return state;
    }
}
