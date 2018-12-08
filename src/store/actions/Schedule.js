import { 
    GET_SCHEDULE_CHOOSE_DAY,
    POST_START_SCHEDULE_TRAINER,
    POST_SUCCESS_SCHEDULE_TRAINER,
    POST_FAILURE_SCHEDULE_TRAINER
} from '../constants/schedule';
import { scheduleService } from '../../services/scheduleService';

export function getScheduleChooseDay(date) {
    return {
        type: GET_SCHEDULE_CHOOSE_DAY, 
        payload: date
    };
}

// Note: Отправляем запрос на создание расписания тренера
export function createScheduleTrainer (data) {
    console.log('createScheduleTrainer action');
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