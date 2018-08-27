// import { combineReducers } from 'redux'
import { TOGGLE_PANEL_SCHEDULE_HIDE, TOGGLE_PANEL_SCHEDULE } from './actions'


export const initialStateToggleSchedule = {
    toggleSchedule: {
        visibilityPanel: TOGGLE_PANEL_SCHEDULE_HIDE,
        visiblePanel: false,
        testText: 'testText'
    },

    listSchedule: [{ // список расписания
        date: '01.09', // это брать как id key можно
        list: [{
            idItemScheduleList: 'idItemScheduleList-1', // идентификатор 
            startTime: '10:00', // начальное время брони - в каком виде передавать, наверное нужно date почитать как форимруется
            finishTime: '13:00',
            status: true, // true - свободно, false - забронировано
            price: 200, // цена в текущий промежуток времени (промежутки времени должны группироваться в зависимости от цены)
            court: 4 // номер корта
        }, {
            idItemScheduleList: 'idItemScheduleList-2',
            startTime: '13:00',
            finishTime: '19:00',
            status: false,
            price: 200,
            court: 4
        }]
    }, {
        date: '02.09',
        list: [{
            idItemScheduleList: 'idItemScheduleList-3',
            startTime: '10:00',
            finishTime: '19:00',
            status: false,
            price: 200,
            court: 4
        }]
    }]
}

export function toggleSchedule(state = initialStateToggleSchedule, action) {
    switch (action.type) {
        case TOGGLE_PANEL_SCHEDULE: 
            return {...state, visiblePanel: action.toggle}
        
        default: 
            return state
    }
}
