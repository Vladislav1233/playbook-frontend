import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';

export const bookingService = {
    createBooking,
    getBookings
};

/*
* type - trainer or playground (required) 
*/
function createBooking(type, data) {
    let valueToken = localStorage.getItem('userToken');

    return axios ({
        method: 'post',
        url: `${API_URL}/api/booking/${type}/create`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        data: data
    });
}

/*
* Получить входящие запросы на бронирование времени тренера или площадки
* type (required) - trainer or playground
* id - trainer or playground id
*/
function getBookings(type, id) {
    const valueToken = localStorage.getItem('userToken');

    return axios ({
        method: 'get',
        url: `${API_URL}/api/booking/${type}/${id}`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        }
    });
}