import { combineReducers, createStore } from 'redux';
import listSchedule from './listSchedule';
import getDayFilter from './getDayFilter';
import toggleMenu from './toggleMenu';
import scheduleTrainer from './scheduleTrainer';

export default function(initialState = {}) {
    const rootReducer = combineReducers({
        listSchedule,
        getDayFilter,
        toggleMenu,
        scheduleTrainer
    });

    return createStore(rootReducer, initialState);
}