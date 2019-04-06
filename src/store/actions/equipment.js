import {
	GET_ALL_EQUIPMENTS_FOR_BOOKABLE_START,
	GET_ALL_EQUIPMENTS_FOR_BOOKABLE_SUCCESS,
	GET_ALL_EQUIPMENTS_FOR_BOOKABLE_FAILURE,

	CREATE_EQUIPMENT_START,
	CREATE_EQUIPMENT_SUCCESS,
	CREATE_EQUIPMENT_FAILURE
} from '../constants/equipment';

import { equipment } from '../../services/equipment';

export function createEquipment(data) {
	return dispatch => {
        dispatch(start());

        equipment.createEquipment(data)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function start() {
        return {
            type: CREATE_EQUIPMENT_START
        }
    }

    function success(response) {
        return {
            type: CREATE_EQUIPMENT_SUCCESS,
            payload: response
        }
    }

    function failure(error) {
        return {
            type: CREATE_EQUIPMENT_FAILURE,
            payload: error
        }
    }
};

export function getAllEquipmentsForBookable(bookable_type, bookable_uuid) {
	return dispatch => {
        dispatch(start());

        equipment.getAllEquipmentsForBookable(bookable_type, bookable_uuid)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function start() {
        return {
            type: GET_ALL_EQUIPMENTS_FOR_BOOKABLE_START
        }
    }

    function success(response) {
        return {
            type: GET_ALL_EQUIPMENTS_FOR_BOOKABLE_SUCCESS,
            payload: response
        }
    }

    function failure(error) {
        return {
            type: GET_ALL_EQUIPMENTS_FOR_BOOKABLE_FAILURE,
            payload: error
        }
    }
};