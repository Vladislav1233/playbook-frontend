import { userConstants } from '../constants/userConstants';

const initUserInformation = {
    firstName: localStorage.getItem('userInformation') ? JSON.parse(localStorage.getItem('userInformation')).first_name : null,

    lastName: localStorage.getItem('userInformation') ? JSON.parse(localStorage.getItem('userInformation')).last_name : null
}

const initialState = {
    authorization: localStorage.getItem('userToken') ? true : false,

    userRole: localStorage.getItem('userRole') ? JSON.parse(localStorage.getItem('userRole')) : null,

    userId:  localStorage.getItem('userId') ? JSON.parse(localStorage.getItem('userId')) : null,

    userInformation: localStorage.getItem('userInformation') ? initUserInformation : null
};

export default function identificate(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST: 
            return {
                ...state
            }

        case userConstants.LOGIN_SUCCESS:
            const newUserInformation = {
                firstName: action.payload.first_name,
                lastName: action.payload.last_name
            };
            return {
                ...state,
                authorization: true,
                userRole: action.payload.roles,
                userId: action.payload.id,
                userInformation: newUserInformation
            }

        case userConstants.LOGIN_FAILURE:
            return {
                ...state
            }
        
        case userConstants.LOGOUT_START:
            return {
                ...state
            }

        case userConstants.LOGOUT_SUCCESS: 
            return {
                ...state,
                authorization: false,
                userRole: null,
                userId: null,
                userInformation: null
            }

        case userConstants.LOGOUT_FAILURE:
            return {
                ...state
            }

        default:
            return {
                ...state
            }
  }
};