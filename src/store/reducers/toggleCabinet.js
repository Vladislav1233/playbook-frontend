import { TOGGLE_CABINET } from '../constants/toggleCabinet';

const initialState = {
    toggleCabinet: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_CABINET:
            return {
                toggleCabinet: !state.toggleCabinet
            }
        
        default:
            return state;
    }
}