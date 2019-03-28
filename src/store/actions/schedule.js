import { 
    POST_START_SCHEDULE_TRAINER,
    POST_SUCCESS_SCHEDULE_TRAINER,
    POST_FAILURE_SCHEDULE_TRAINER,

    EDIT_START_SCHEDULE_TRAINER,
    EDIT_SUCCESS_SCHEDULE_TRAINER,
    EDIT_FAILURE_SCHEDULE_TRAINER,

    GET_START_SCHEDULE_TRAINER,
    GET_SUCCESS_SCHEDULE_TRAINER,
    GET_FAILURE_SCHEDULE_TRAINER,

    DECLINE_CONFIRM_BOOKING_START,
    // DECLINE_CONFIRM_BOOKING_SUCCESS,
    DECLINE_CONFIRM_BOOKING_FAILURE
} from '../constants/schedule';

import { scheduleService } from '../../services/scheduleService';
import { bookingService } from '../../services/booking';
import { alertActions } from './alertAction';
import textErrorFromServer from '../../helpers/textErrorFromServer';

// Note: Отправляем запрос на создание расписания тренера
export function createScheduleTrainer(data, type = 'trainer') {
    return dispatch => {

        dispatch(start());

        return scheduleService.createSchedule(type, data)
            .then(
                response => {
                    dispatch(success(response));
                    return response;
                },
                error => {
                    dispatch(failure(error));
                    return error;
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

export function editTrainerSchedule(schedule_uuid, data) {
    return dispatch => {
        dispatch(start());

        return scheduleService.editSchedule(schedule_uuid, data)
            .then(
                response => {
                    dispatch(success(response));
                    return response;
                },
                error => {
                    dispatch(failure(error));
                    return error;
                }
            );
    }

    function start() {
        return {
            type: EDIT_START_SCHEDULE_TRAINER
        }
    }

    function success(response) {
        return {
            type: EDIT_SUCCESS_SCHEDULE_TRAINER,
            payload: response
        }
    }

    function failure(error) {
        return {
            type: EDIT_FAILURE_SCHEDULE_TRAINER,
            payload: error
        }
    }
}

/* Note: отправляем запрос на получение расписания тренера
* userId - uuid пользователя расписание которого хотим получить.
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

/*
* Отменить подтвержденное бронирование
* bookingId - uuid объекта бронирования
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
                    dispatch(getTrainerSchedule(userId, dataForGetSchedule));
                    dispatch(alertActions.success('Бронирование успешно отменено.'));
                },
                err => {
                    dispatch(failure(err));
                    dispatch(alertActions.error(`Ошибка! ${textErrorFromServer(err)}`));
                }
            )
    };

    function start() {
        return {
            type: DECLINE_CONFIRM_BOOKING_START
        }
    }

    // function success() {
    //     return {
    //         type: DECLINE_CONFIRM_BOOKING_SUCCESS
    //     }
    // }

    function failure(error) {
        return {
            type: DECLINE_CONFIRM_BOOKING_FAILURE,
            payload: error
        }
    }
}