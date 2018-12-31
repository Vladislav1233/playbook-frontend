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

    TOGGLE_RESPONSE
} from '../constants/schedule';

import { scheduleService } from '../../services/scheduleService';

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
    };

    function start() {
        return {
            type: EDIT_START_SCHEDULE_TRAINER
        }
    };

    function success(response) {
        console.log(response);
        return {
            type: EDIT_SUCCESS_SCHEDULE_TRAINER,
            payload: response
        }
    };

    function failure(error) {
        return {
            type: EDIT_FAILURE__SCHEDULE_TRAINER,
            payload: error
        }
    }
}

// Note: отправляем запрос на получение расписания тренера
export function getTrainerSchedule(userId, data) {
    return dispatch => {
        dispatch(start());

        scheduleService.getSchedule('trainer', userId, data)
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
            type: GET_START_SCHEDULE_TRAINER
        }
    }

    function success(response) {
        return {
            type: GET_SUCCESS_SCHEDULE_TRAINER,
            payload: response.data,
            date: data.start_time
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