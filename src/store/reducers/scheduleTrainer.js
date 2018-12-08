import { 
    POST_START_SCHEDULE_TRAINER,
    POST_SUCCESS_SCHEDULE_TRAINER,
    POST_FAILURE_SCHEDULE_TRAINER
} from '../constants/schedule';

const initialState = {
    preloader: false,
    scheduleTrainer: [
        { // Note: Свободное время тренера, у которого один или несколько кортов
            date: '09.12.18', // это брать как id key можно
            nameDay: "Воскресенье",
            list: [{
                idItemScheduleList: 'idItemSchedule1',
                startTime: '12:00',
                finishTime: '15:00',
                status: true,
                price: 700,
                freeCourt: true,
                courts: [{ // Приоритетный корт должен быть всегда первым
                    id: '1',
                    name: 'Lawn tennis',
                    street: 'Первомайская',
                    number: 59,
                    priority: true
                }, {
                    id: '2',
                    name: 'Ulgu',
                    street: 'Московское шоссе',
                    number: 33,
                    priority: false
                }]
            }, {
                idItemScheduleList: 'idItemSchedule2',
                startTime: '15:00',
                finishTime: '18:00',
                status: true,
                price: 700,
                freeCourt: false,
                courts: [{
                    id: '3',
                    name: 'Lawn tennis',
                    street: 'Первомайская',
                    number: 59,
                    priority: true
                }, {
                    id: '4',
                    name: 'Ulgu',
                    street: 'Московское шоссе',
                    number: 33,
                    priority: false
                }]
            }, {
                idItemScheduleList: 'idItemSchedule3',
                startTime: '18:00',
                finishTime: '20:00',
                status: false
            }]
        }, { // Note: Свободное время тренера, но кортов нет
            date: '10.12.18',
            nameDay: "Понедельник",
            list: [{
                idItemScheduleList: 'idItemSchedule4',
                startTime: '15:00',
                finishTime: '18:00',
                status: true,
                price: 700,
                freeCourt: false,
                courts: [{
                    id: '5',
                    name: 'Lawn tennis',
                    street: 'Первомайская',
                    number: 59,
                    priority: true
                }, {
                    id: '6',
                    name: 'Ulgu',
                    street: 'Московское шоссе',
                    number: 33,
                    priority: false
                }]
            }]
        }, { // Note: Тренер занят
            date: '11.12.18',
            nameDay: "Вторник",
            list: [{
                id: '7',
                idItemScheduleList: 'idItemSchedule5',
                startTime: '15:00',
                finishTime: '18:00',
                status: false
            }]
        }, { // Note: Тренер занят
            date: '12.12.18',
            nameDay: "Среда",
            list: [{
                id: '8',
                idItemScheduleList: 'idItemSchedule6',
                startTime: '12:00',
                finishTime: '14:00',
                status: false
            }, {
                id: '9',
                idItemScheduleList: 'idItemSchedule7',
                startTime: '14:00',
                finishTime: '18:00',
                status: true,
                freeCourt: true,
                courts: [{
                    id: '6',
                    name: 'Lawn tennis',
                    street: 'Первомайская',
                    number: 59,
                    priority: true
                }]
            }, {
                id: '10',
                idItemScheduleList: 'idItemSchedule8',
                startTime: '18:00',
                finishTime: '20:00',
                status: false
            }]
        }
    ]
}

export default function(state = initialState, action) {
    switch (action.type) {
        case POST_START_SCHEDULE_TRAINER:
            return {
                preloader: true
            }
        
        case POST_SUCCESS_SCHEDULE_TRAINER:
            return {
                preloader: false
            }
        
        case POST_FAILURE_SCHEDULE_TRAINER:
            return {
                preloader: false
            }

        default:
            return state;
    }
}
