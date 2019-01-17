import {
    GET_BOOKINGS_START,
    GET_BOOKINGS_SUCCESS,
    GET_BOOKINGS_FAILURE
} from '../constants/booking';

import { bookingService } from '../../services/booking';

/*
* Получить входящие запросы на бронирование времени тренера или площадки
* type (required) - trainer or playground
* id - trainer or playground id
*/
export function getBookings(type, id) {
    return dispatch => {
        dispatch(start());

        bookingService.getBookings(type, id)
            .then(
                res => {
                    dispatch(success(res));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function start() {
        return {
            type: GET_BOOKINGS_START
        }
    }

    function success(response) {
        return {
            type: GET_BOOKINGS_SUCCESS,
            payload: response
        }
    }

    function failure(error) {
        return {
            type: GET_BOOKINGS_FAILURE,
            payload: error
        }
    }
}