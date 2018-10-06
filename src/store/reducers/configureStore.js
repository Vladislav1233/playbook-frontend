import { combineReducers, createStore } from 'redux';
import listSchedule from './listSchedule';
import getDayFilter from './getDayFilter';

export default function(initialState = {}) {
    const rootReducer = combineReducers({
        listSchedule: listSchedule,
        getDayFilter: getDayFilter
    });

    return createStore(rootReducer, initialState);
}