import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';
import Moment from 'moment';

export const bookingService = {
    createBooking,
    getBookings,
    confirmBooking,
    declineBooking,
    getAllBookingsForUser
};

/*
* Забронировать услугу
* type - trainer or playground (required) 
*/
function createBooking(type, data) {
    const valueToken = localStorage.getItem('userToken');

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
function getBookings(type, id, data = { // TODO
    limit: 100,
    offset: 0,
    start_time: Moment(new Date(2018, 0, 1)).format('YYYY-MM-DD HH:mm:ss'),
    end_time: Moment(new Date(2050, 0, 1)).format('YYYY-MM-DD HH:mm:ss')
}) {
    const valueToken = localStorage.getItem('userToken');

    return axios ({
        method: 'get',
        url: `${API_URL}/api/booking/${type}/${id}`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        params: data
    });
}

/*
* Принять запрос на бронирование времени тренера или площадки
* bookingId - id объекта бронирования
*/
function confirmBooking(bookingId) {
    const valueToken = localStorage.getItem('userToken');

    return axios ({
        method: 'post',
        url: `${API_URL}/api/booking/confirm/${bookingId}`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        }
    });
}

/*
* Отменить бронирование
* bookingId - id объекта бронирования
* data: {
*   note: 'Сообщение пользователю'
*}
*/
function declineBooking(bookingId, data) {
    const valueToken = localStorage.getItem('userToken');

    return axios ({
        method: 'post',
        url: `${API_URL}/api/booking/decline/${bookingId}`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        data: data
    });
}

function getAllBookingsForUser(data = {
    limit: 100,
    offset: 0,
    start_time: Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    end_time: Moment(new Date(2050, 0, 1)).format('YYYY-MM-DD HH:mm:ss') 
}) {// TODO
    const valueToken = localStorage.getItem('userToken');

    return axios({
        method: 'get',
        url: `${API_URL}/api/booking/all`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        params: data
    });
};