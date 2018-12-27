import { 
    POST_START_SCHEDULE_TRAINER,
    POST_SUCCESS_SCHEDULE_TRAINER,
    POST_FAILURE_SCHEDULE_TRAINER,
    
    GET_START_SCHEDULE_TRAINER,
    GET_SUCCESS_SCHEDULE_TRAINER,
    GET_FAILURE_SCHEDULE_TRAINER
} from '../constants/schedule';

import moment from 'moment';

const initialState = {
    preloader: false,
    scheduleTrainer: {
        date: moment().format('DD.MM.YYYY'),
        nameDay: moment().format('dddd'), 
        list: null
    }
}

// { // Note: Свободное время тренера, но кортов нет
//     date: '17.12.2018',
//     nameDay: "Понедельник",
//     list: [{
//         idItemScheduleList: 'idItemSchedule4',
//         startTime: '15:00',
//         finishTime: '18:00',
//         status: true,
//         price: 700,
//         freeCourt: false,
//         courts: [{
//             id: '5',
//             name: 'Lawn tennis',
//             street: 'Первомайская',
//             number: 59,
//             priority: true
//         }, {
//             id: '6',
//             name: 'Ulgu',
//             street: 'Московское шоссе',
//             number: 33,
//             priority: false
//         }]
//     }]
// }

// { // Note: Тренер занят
//     date: '19.12.2018',
//     nameDay: "Среда",
//     list: [{
//         id: '8',
//         idItemScheduleList: 'idItemSchedule6',
//         startTime: '12:00',
//         finishTime: '14:00',
//         status: false
//     }, {
//         id: '9',
//         idItemScheduleList: 'idItemSchedule7',
//         startTime: '14:00',
//         finishTime: '18:00',
//         status: true,
//         freeCourt: true,
//         courts: [{
//             id: '6',
//             name: 'Lawn tennis',
//             street: 'Первомайская',
//             number: 59,
//             priority: true
//         }]
//     }, {
//         id: '10',
//         idItemScheduleList: 'idItemSchedule8',
//         startTime: '18:00',
//         finishTime: '20:00',
//         status: false
//     }]
// }

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
