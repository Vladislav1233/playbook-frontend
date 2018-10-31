const initialState = [{ // список расписания
    date: '30.10.18', // это брать как id key можно
    nameDay: "Понедельник",
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
    date: '31.10.18',
    nameDay: "Вторник",
    list: [{
        idItemScheduleList: 'idItemScheduleList-3',
        startTime: '10:00',
        finishTime: '19:00',
        status: false,
        price: 200
    }]
}]

export default function(state = initialState, action) {
    return state;
}