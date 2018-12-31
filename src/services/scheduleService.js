import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';

export const scheduleService = {
    createSchedule,
    editSchedule,
    deleteSchedule,
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
    });
};

function editSchedule (schedule_id, data) {
    let valueToken = localStorage.getItem('userToken');

    return axios ({
        method: 'post',
        url: `${API_URL}/api/schedule/edit/${schedule_id}`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        data: data
    });
};

function deleteSchedule (schedule_id) {
    let valueToken = localStorage.getItem('userToken');

    return axios ({
        method: 'delete',
        url: `${API_URL}/api/schedule/delete/${schedule_id}`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        }
    })
}

function getSchedule (type, userId, data) {
    return axios({
        method: 'get',
        url: `${API_URL}/api/schedule/${type}/${userId}`,
        params: data
    })
};