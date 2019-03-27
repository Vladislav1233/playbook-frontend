import { 
    GET_TRAINER_INFO_START, 
    GET_TRAINER_INFO_SUCCESS, 
    GET_TRAINER_INFO_FAILURE    
} from '../constants/trainerInfo';

const initialState = {
    trainerInformation: null,
    preloader: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TRAINER_INFO_START:
            return {
                ...state,
                preloader: true
            }
        
        case GET_TRAINER_INFO_SUCCESS:
            return {
                ...state,
                trainerInformation: action.payload.data.data,
                preloader: false
            }

        case GET_TRAINER_INFO_FAILURE:
            return {
                ...state,
                preloader: false
            }
        
        default:
            return {
                ...state
            }
    }
};
