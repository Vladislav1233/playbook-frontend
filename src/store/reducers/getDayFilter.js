import { GET_SCHEDULE_CHOOSE_DAY } from '../constants/schedule';

const initialState = ''

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_SCHEDULE_CHOOSE_DAY: 
            return action.payload;
        default:
            return state;
    }
}