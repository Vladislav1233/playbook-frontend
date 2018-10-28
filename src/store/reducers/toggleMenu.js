import { TOGGLE_MENU } from '../constants/toggleMenu';

const initialState = {
    toggleMenu: false
}

export default function(state = initialState, action) {
    console.log(state);
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                toggleMenu: !state.toggleMenu
            }
        
        default:
            return state;
    }
}