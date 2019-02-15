import {
    SCROLL_PAGE
} from '../constants/scrollPage';

const initialState = {
    isNotScrollPage: false
};

export default function(state = initialState, action) {
    switch (action.type) {

        case SCROLL_PAGE:
            return {
                ...state,
                isNotScrollPage: action.payload
            }

        default:
            return {
                ...state
            }
    }
};