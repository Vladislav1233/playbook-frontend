import { combineReducers, createStore } from 'redux';
import listSchedule from './listSchedule';
import getDayFilter from './getDayFilter';
import toggleMenu from './toggleMenu';
import scheduleTrainer from './scheduleTrainer';
import roleUser from './roleUser';

export default function(initialState = {}) {
    const rootReducer = combineReducers({
        listSchedule,
        getDayFilter,
        toggleMenu,
        scheduleTrainer,
        roleUser
    });

    return createStore(rootReducer, initialState);
}