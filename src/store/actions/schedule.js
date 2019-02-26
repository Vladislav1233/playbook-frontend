import { 
    POST_START_SCHEDULE_TRAINER,
    POST_SUCCESS_SCHEDULE_TRAINER,
    POST_FAILURE_SCHEDULE_TRAINER,

    EDIT_START_SCHEDULE_TRAINER,
    EDIT_SUCCESS_SCHEDULE_TRAINER,
    EDIT_FAILURE__SCHEDULE_TRAINER,

    GET_START_SCHEDULE_TRAINER,
    GET_SUCCESS_SCHEDULE_TRAINER,
    GET_FAILURE_SCHEDULE_TRAINER,

    TOGGLE_RESPONSE,

    DECLINE_CONFIRM_BOOKING_START,
    DECLINE_CONFIRM_BOOKING_SUCCESS,
    DECLINE_CONFIRM_BOOKING_FAILURE
} from '../constants/schedule';

import { scheduleService } from '../../services/scheduleService';
import { bookingService } from '../../services/booking';

// Note: Отправляем запрос на создание расписания тренера
export function createScheduleTrainer(data) {
    return dispatch => {

        dispatch(start());

        scheduleService.createSchedule('trainer', data)
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
            type: POST_START_SCHEDULE_TRAINER
        }
    }

    function success(response) {
        return {
            type: POST_SUCCESS_SCHEDULE_TRAINER,
            payload: response
        }
    }

    function failure(response) {
        return {
            type: POST_FAILURE_SCHEDULE_TRAINER,
            payload: response
        }
    }
}

export function editTrainerSchedule(schedule_id, data) {
    return dispatch => {
        dispatch(start());

        scheduleService.editSchedule(schedule_id, data)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                }
            );
    }

    function start() {
        return {
            type: EDIT_START_SCHEDULE_TRAINER
        }
    }

    function success(response) {
        console.log(response);
        return {
            type: EDIT_SUCCESS_SCHEDULE_TRAINER,
            payload: response
        }
    }

    function failure(error) {
        return {
            type: EDIT_FAILURE__SCHEDULE_TRAINER,
            payload: error
        }
    }
}

/* Note: отправляем запрос на получение расписания тренера
* userId - id пользователя расписание которого хотим получить.
* data - данные API для отправки запроса
* isCabinet - если true, то присылаем данные забронированного времени тренера со всей конфиденциальной информацией, которую модет знать и читать только тренер.
*/
export function getTrainerSchedule(userId, data, isCabinet = false) {
    return dispatch => {
        dispatch(start());

        scheduleService.getSchedule('trainer', userId, data)
            .then(
                response => {
                    const params = { // TODO
                        limit: 100,
                        offset: 0,
                        ...data
                    }
                    
                    if (isCabinet) {
                        bookingService.getBookings('trainer', userId, params).then(
                            responseReservedTime => {
                                dispatch(success(response, responseReservedTime));
                            }
                        )
                    } else {
                        dispatch(success(response));
                    }
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                }
            );
    }

    function start() {
        return {
            type: GET_START_SCHEDULE_TRAINER
        }
    }

    function success(response, booked) {
        return {
            type: GET_SUCCESS_SCHEDULE_TRAINER,
            payload: response.data,
            date: data.start_time,
            reservedResponse: booked,
            isCabinet: isCabinet
        }
    }

    function failure(response) {
        return {
            type: GET_FAILURE_SCHEDULE_TRAINER,
            payload: response
        }
    }
}

export function toggleResponse() {
    return {
        type: TOGGLE_RESPONSE
    }
}

/*
* Отменить подтвержденное бронирование
* bookingId - id объекта бронирования
* data: {
*   note: 'Сообщение пользователю'
*}
*/
export function declineConfirmBooking(bookingId, data, userId, dataForGetSchedule) {
    return dispatch => {
        dispatch(start());

        bookingService.declineBooking(bookingId, data)
            .then(
                () => {
                    // dispatch(success());
                    dispatch(getTrainerSchedule(userId, dataForGetSchedule));
                },
                err => {
                    dispatch(failure(err));
                }
            )
    };

    function start() {
        return {
            type: DECLINE_CONFIRM_BOOKING_START
        }
    }

    function success() {
        return {
            type: DECLINE_CONFIRM_BOOKING_SUCCESS
        }
    }

    function failure(error) {
        return {
            type: DECLINE_CONFIRM_BOOKING_FAILURE,
            payload: error
        }
    }
}