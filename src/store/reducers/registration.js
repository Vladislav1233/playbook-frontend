import { userConstants } from '../constants/userConstants';

const initialState = {
    preloader: false
}

export default function registration(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { 
                preloader: true 
            };

        case userConstants.REGISTER_SUCCESS:
            return { 
                preloader: false 
            };

        case userConstants.REGISTER_FAILURE:
            return { 
                preloader: false, 
                error: action.error 
            };

        default:
            return state
  }
}