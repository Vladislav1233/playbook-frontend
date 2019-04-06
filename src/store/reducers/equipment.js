import {
	GET_ALL_EQUIPMENTS_FOR_BOOKABLE_START,
	GET_ALL_EQUIPMENTS_FOR_BOOKABLE_SUCCESS,
	GET_ALL_EQUIPMENTS_FOR_BOOKABLE_FAILURE,

	CREATE_EQUIPMENT_START,
	CREATE_EQUIPMENT_SUCCESS,
	CREATE_EQUIPMENT_FAILURE
} from '../constants/equipment';

const initialState = {
    equipments: [],
    preloader: false
};

export default function equipment(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_EQUIPMENTS_FOR_BOOKABLE_START:
            return {
                ...state,
                preloader: true
            }
        
        case GET_ALL_EQUIPMENTS_FOR_BOOKABLE_SUCCESS:
            return {
                ...state,
                preloader: false,
                equipments: action.payload.data.data
            }

        case GET_ALL_EQUIPMENTS_FOR_BOOKABLE_FAILURE:
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