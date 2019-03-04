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
import booking from './booking';
import trainerList from './trainerList';
import scrollPage from './scrollPage';
import alertReducer from './alertReducer';

export default function(initialState = {}) {
    const rootReducer = combineReducers({
        scheduleCourt,
        toggleMenu,
        scheduleTrainer,
        roleUser,
        registration,
        identificate,
        toggleCabinet,
        searchPlayground,
        booking,
        trainerList,
        scrollPage,
        alertReducer
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));
}