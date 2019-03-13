import { TOGGLE_MENU, CLOSE_MENU } from '../constants/toggleMenu';

const initialState = {
    toggleMenu: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                toggleMenu: !state.toggleMenu
            }

        case CLOSE_MENU:
            return {
                toggleMenu: false
            }
        
        default:
            return state;
    }
}