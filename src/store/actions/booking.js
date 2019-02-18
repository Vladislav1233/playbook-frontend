import {
    GET_BOOKINGS_START,
    GET_BOOKINGS_SUCCESS,
    GET_BOOKINGS_FAILURE,

    CONFIRM_BOOKINGS_START,
    CONFIRM_BOOKINGS_SUCCESS,
    CONFIRM_BOOKINGS_FAILURE,

    CREATE_BOOKING_START,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAILURE,

    DECLINE_BOOKING_START,
    DECLINE_BOOKING_SUCCESS,
    DECLINE_BOOKING_FAILURE,

    GET_ALL_BOOKINGS_FOR_USER_START,
    GET_ALL_BOOKINGS_FOR_USER_SUCCESS,
    GET_ALL_BOOKINGS_FOR_USER_FAILURE
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

export function confirmBooking(bookingId) {
    return dispatch => {
        dispatch(start());

        bookingService.confirmBooking(bookingId)
            .then(
                res => {
                    console.log(res);
                    dispatch(success(res));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function start() {
        return {
            type: CONFIRM_BOOKINGS_START
        }
    }

    function success(response) {
        return {
            type: CONFIRM_BOOKINGS_SUCCESS,
            payload: response
        }
    }

    function failure(error) {
        return {
            type: CONFIRM_BOOKINGS_FAILURE,
            payload: error
        }
    }
}

/*
* Забронировать услугу
* 
* 
*/
export function createBooking(typeBooking, data) {
    return dispatch => {
        dispatch(start());

        bookingService.createBooking(typeBooking, data)
            .then(
                res => {
                    dispatch(success(res)); 
            }, 
                err => {
                    dispatch(failure(err));
                    console.log(err);
            });
    }

    function start() {
        return {
            type: CREATE_BOOKING_START
        }
    }

    function success(response) {
        return {
            type: CREATE_BOOKING_SUCCESS,
            payload: response
        }
    }

    function failure(error) {
        return {
            type: CREATE_BOOKING_FAILURE,
            payload: error
        }
    }
}

/*
* Отменить бронирование
* bookingId - id объекта бронирования
* data: {
*   note: 'Сообщение пользователю'
*}
*/
export function declineBooking(bookingId, data) {
    return dispatch => {
        dispatch(start());

        bookingService.declineBooking(bookingId, data)
            .then(
                res => {
                    dispatch(success(res));
                },
                err => {
                    dispatch(failure(err));
                }
            )
    };

    function start() {
        return {
            type: DECLINE_BOOKING_START
        }
    }

    function success(response) {
        return {
            type: DECLINE_BOOKING_SUCCESS,
            payload: response
        }
    }

    function failure(error) {
        return {
            type: DECLINE_BOOKING_FAILURE,
            payload: error
        }
    }
}

export function getAllBookingsForUser() {
    return dispatch => {
        dispatch(start());

        bookingService.getAllBookingsForUser()
            .then(
                res => {
                    console.log(res);
                    dispatch(success(res));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function start() {
        return {
            type: GET_ALL_BOOKINGS_FOR_USER_START
        }
    }

    function success(response) {
        return {
            type: GET_ALL_BOOKINGS_FOR_USER_SUCCESS,
            payload: response
        }
    }

    function failure(error) {
        return {
            type: GET_ALL_BOOKINGS_FOR_USER_FAILURE,
            payload: error
        }
    }
};