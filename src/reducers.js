// import { combineReducers } from 'redux'
import { TOGGLE_PANEL_SCHEDULE_HIDE, TOGGLE_PANEL_SCHEDULE } from './actions'


export const initialStateToggleSchedule = {
    toggleSchedule: {
        visibilityPanel: TOGGLE_PANEL_SCHEDULE_HIDE,
        visiblePanel: false,
        testText: 'testText'
    }
}

export function toggleSchedule(state = initialStateToggleSchedule, action) {
    switch (action.type) {
        case TOGGLE_PANEL_SCHEDULE: 
            return {...state, visiblePanel: action.toggle}
        
        default: 
            return state
    }
}
