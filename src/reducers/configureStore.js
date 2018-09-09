import { combineReducers, createStore } from 'redux';
// import thunk from 'redux-thunk';
import listSchedule from './listSchedule';
import filterListSchedule from './filterListSchedule';

export default function(initialState = {}) {
    const rootReducer = combineReducers({
        listSchedule: listSchedule,
        filterListSchedule: filterListSchedule
    });

    return createStore(rootReducer, initialState);
}