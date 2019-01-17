import { userConstants } from '../constants/userConstants';

const initialState = {
    authorization: localStorage.getItem('valueToken') ? true : false
};

export default function identificate(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                authorization: true
            }

        case userConstants.LOGOUT: 
            return {
                ...state,
                authorization: false
            }

        default:
            return state
  }
};