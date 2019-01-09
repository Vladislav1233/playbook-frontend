import { 
    GET_START_SEARCH_PLAYGROUND, 
    GET_SUCCESS_SEARCH_PLAYGROUND, 
    GET_FAILURE_SEARCH_PLAYGROUND,
    CLEAR_SEARCH_PLAYGROUND
} from '../constants/searchPlayground';

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
            console.log(action.payload.data);
            return {
                ...state,
                preloader: false,
                playgrounds: action.payload.data
            };
        
        case GET_FAILURE_SEARCH_PLAYGROUND:
            return {
                ...state,
                preloader: false
            };
        
        case CLEAR_SEARCH_PLAYGROUND:
            return {
                ...state,
                playgrounds: []
            };

        default: 
            return state
    }
}