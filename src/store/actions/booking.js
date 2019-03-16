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
import { alertActions } from './alertAction';
import textErrorFromServer from '../../helpers/textErrorFromServer';
import { handleErrorServer } from '../../helpers/handleErrorServer';

/*
* Получить входящие запросы на бронирование времени тренера или площадки
* type (required) - trainer or playground
* uuid - trainer or playground uuid
*/
export function getBookings(type, uuid) {
    return dispatch => {
        dispatch(start());

        bookingService.getBookings(type, uuid)
            .then(
                res => {
                    dispatch(success(res));
                },
                error => {
                    dispatch(failure(error));
                    handleErrorServer(error.response.status);
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
                    dispatch(success(res));
                    dispatch(alertActions.success('Запрос на бронирование принят и отобразится в вашем расписании.'))
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(`Ошибка! ${textErrorFromServer(error)}`));
                    handleErrorServer(error.response.status);
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

        // TODO_AMED: ссылку на мои брони
        bookingService.createBooking(typeBooking, data)
            .then(
                res => {
                    dispatch(success(res)); 
                    dispatch(alertActions.success('Запрос на бронирование успешно отправлен! Как только ваш запрос обработают на ваш номер придёт смс-оповещение. Статус можно смотреть в разделе "Мои бронирования".'));
            }, 
                err => {
                    dispatch(failure(err));
                    dispatch(alertActions.error( `Ошибка! ${textErrorFromServer(err)}` ));
                    handleErrorServer(err.response.status);
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
            payload: error.response
        }
    }
}

/*
* Отменить бронирование
* bookingId - uuid объекта бронирования
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
                    console.log(res);
                    dispatch(success(res));
                    dispatch(alertActions.success('Бронирование успешно отменено.'));
                },
                err => {
                    console.log(err);
                    dispatch(failure(err));
                    dispatch(alertActions.error(`Ошибка! ${textErrorFromServer(err)}`));
                    handleErrorServer(err.response.status);
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
                    dispatch(success(res));
                },
                error => {
                    dispatch(failure(error));
                    handleErrorServer(error.response.status);
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