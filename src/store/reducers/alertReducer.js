import { alertConstants } from '../constants/alertConstants';

const initialState = {
    type: '',
    message: ''
}

export default function alertReducer(state = initialState, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            }

        case alertConstants.ERROR:
            return {
                type: 'alert-error',
                message: action.message
            }

        case alertConstants.CLEAR:
            return {
                ...initialState
            }

        default:
            return state
    }
}