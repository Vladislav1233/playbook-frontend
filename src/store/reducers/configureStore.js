import { combineReducers, createStore } from 'redux';
import getDayFilter from './getDayFilter';
import toggleMenu from './toggleMenu';
import scheduleTrainer from './scheduleTrainer';
import scheduleCourt from './scheduleCourt';
import roleUser from './roleUser';


export default function(initialState = {}) {
    const rootReducer = combineReducers({
        scheduleCourt,
        getDayFilter,
        toggleMenu,
        scheduleTrainer,
        roleUser
    });

    return createStore(rootReducer, initialState);
}