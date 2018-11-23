import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import getDayFilter from './getDayFilter';
import toggleMenu from './toggleMenu';
import scheduleTrainer from './scheduleTrainer';
import scheduleCourt from './scheduleCourt';
import roleUser from './roleUser';
import registration from './registration';


export default function(initialState = {}) {
    const rootReducer = combineReducers({
        scheduleCourt,
        getDayFilter,
        toggleMenu,
        scheduleTrainer,
        roleUser,
        registration
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));
}