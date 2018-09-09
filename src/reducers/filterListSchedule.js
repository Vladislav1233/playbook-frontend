const FILTER_LIST_SCHEDULE = "FILTER_LIST_SCHEDULE";

const initialState = ''

export default function(state = initialState, action) {
    switch (action.type) {
        case FILTER_LIST_SCHEDULE: 
            return action.payload;
        default:
            return state;
    }
}