const initialState = [
    { // Note: Свободное время тренера, у которого один или несколько кортов
        date: '29.10.18', // это брать как id key можно
        nameDay: "Понедельник",
        list: [{
            idItemSchedule: 'idItemSchedule1',
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
            idItemSchedule: 'idItemSchedule2',
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
            idItemSchedule: 'idItemSchedule3',
            startTime: '18:00',
            finishTime: '20:00',
            status: false
        }]
    }, { // Note: Свободное время тренера, но кортов нет
        date: '30.10.18',
        nameDay: "Вторник",
        list: [{
            idItemSchedule: 'idItemSchedule4',
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
        date: '31.10.18',
        nameDay: "Среда",
        list: [{
            id: '7',
            idItemSchedule: 'idItemSchedule5',
            startTime: '15:00',
            finishTime: '18:00',
            status: false
        }]
    }
]

export default function(state = initialState, action) {
    return state;
}