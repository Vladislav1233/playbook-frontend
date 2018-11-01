const initialState = [{ // список расписания
    date: '01.11.18', // это брать как id key можно
    nameDay: "Понедельник",
    timeWork: '10:00 - 22:00',
    court: [{
        name: 1,
        type: 'Искуственная трава',
        id: 'court-1',
        list: [{
            idItemScheduleList: 'idItemScheduleList-1', // идентификатор 
            startTime: '10:00', // начальное время брони - в каком виде передавать, наверное нужно date почитать как форимруется
            finishTime: '13:00',
            status: true, // true - свободно, false - забронировано
            price: 200 // цена в текущий промежуток времени (промежутки времени должны группироваться в зависимости от цены)
        }, {
            idItemScheduleList: 'idItemScheduleList-2',
            startTime: '13:00',
            finishTime: '19:00',
            status: false,
            price: 200
        }]
    }, {
        name: 2,
        type: 'Искуственная трава',
        id: 'court-2',
        list: [{
            idItemScheduleList: 'idItemScheduleList-3',
            startTime: '10:00',
            finishTime: '13:00',
            status: true,
            price: 200
        }, {
            idItemScheduleList: 'idItemScheduleList-4',
            startTime: '13:00',
            finishTime: '19:00',
            status: false,
            price: 200
        }]
    }, {
        name: 3,
        type: 'Искуственная трава',
        id: 'court-3',
        list: [{
            idItemScheduleList: 'idItemScheduleList-5',
            startTime: '10:00',
            finishTime: '13:00',
            status: true,
            price: 200
        }, {
            idItemScheduleList: 'idItemScheduleList-6',
            startTime: '13:00',
            finishTime: '19:00',
            status: false,
            price: 200
        }, {
            idItemScheduleList: 'idItemScheduleList-7',
            startTime: '19:00',
            finishTime: '22:00',
            status: true,
            price: 800
        }]
    }]
    
}, {
    date: '02.11.18',
    nameDay: "Вторник",
    timeWork: '10:00 - 22:00',
    court: [{
        name: 1,
        type: 'Искуственная трава',
        id: 'court-4',
        list: [{
            idItemScheduleList: 'idItemScheduleList-8',
            startTime: '10:00',
            finishTime: '19:00',
            status: false,
            price: 200
        }]
    }]
}]

export default function(state = initialState, action) {
    return state;
}