import { combineReducers, createStore } from 'redux';
import listSchedule from './listSchedule';
import getDayFilter from './getDayFilter';
import toggleMenu from './toggleMenu';

export default function(initialState = {}) {
    const rootReducer = combineReducers({
        listSchedule: listSchedule,
        getDayFilter: getDayFilter,
        toggleMenu
    });

    return createStore(rootReducer, initialState);
}