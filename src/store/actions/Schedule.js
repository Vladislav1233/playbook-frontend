import { GET_SCHEDULE_CHOOSE_DAY } from '../constants/Schedule';

export function getScheduleChooseDay(date) {
    return {
        type: GET_SCHEDULE_CHOOSE_DAY, 
        payload: date
    };
}