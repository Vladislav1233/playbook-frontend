import { GET_START_SEARCH_PLAYGROUND, GET_SUCCESS_SEARCH_PLAYGROUND, GET_FAILURE_SEARCH_PLAYGROUND } from '../constants/searchPlayground';

const initialState = {
    playgrounds: [],
    preloader: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_START_SEARCH_PLAYGROUND:
            return {
                ...state,
                preloader: true
            };
        
        case GET_SUCCESS_SEARCH_PLAYGROUND: 
            return {
                ...state,
                preloader: false,
                playgrounds: action.payload.data
            };
        
        case GET_FAILURE_SEARCH_PLAYGROUND:
            return {
                ...state,
                preloader: false
            }

        default: 
            return state
    }
}