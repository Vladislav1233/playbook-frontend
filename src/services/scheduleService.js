import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';

export const scheduleService = {
    createSchedule,
    getSchedule
}

function createSchedule (type, data) {
    let valueToken = localStorage.getItem('userToken');
    // Note: type - тип пользователя, trainer or playground (см. API)
    return axios ({
        method: 'post',
        url: `${API_URL}/api/schedule/${type}/create`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        data: data
    })
}

function getSchedule (type, userId, data) {
    console.log(data);
    return axios({
        method: 'get',
        url: `${API_URL}/api/schedule/${type}/${userId}`,
        params: data
    })
}