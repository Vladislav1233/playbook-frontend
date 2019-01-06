import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import toggleMenu from './toggleMenu';
import scheduleTrainer from './scheduleTrainer';
import scheduleCourt from './scheduleCourt';
import roleUser from './roleUser';
import registration from './registration';
import toggleCabinet from './toggleCabinet';
import searchPlayground from './searchPlayground';
import identificate from './identificate';


export default function(initialState = {}) {
    const rootReducer = combineReducers({
        scheduleCourt,
        toggleMenu,
        scheduleTrainer,
        roleUser,
        registration,
        identificate,
        toggleCabinet,
        searchPlayground
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));
}