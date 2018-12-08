import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';

export const scheduleService = {
    createSchedule
}

function createSchedule (type, data) {
    // Note: type - тип пользователя, trainer or playground (см. API)
    return axios ({
        method: 'post',
        url: `${API_URL}/api/schedule/${type}/create`,
        data: data
    })
}