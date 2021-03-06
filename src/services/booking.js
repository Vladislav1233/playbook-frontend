import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';
import Moment from 'moment';
import { dataTime } from '../helpers/dataTime';
import { handleErrorServer } from '../helpers/handleErrorServer';

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
    }).catch(error => {
        handleErrorServer(error.response.status);
        throw error;
    });
}

/*
* Получить входящие запросы на бронирование времени тренера или площадки
* type (required) - trainer or playground
* uuid - trainer or playground uuid
*/
function getBookings(type, uuid, data = { // TODO
    limit: 100,
    offset: 0,
    start_time: Moment(new Date(2018, 0, 1)).format('YYYY-MM-DD HH:mm:ss'),
    end_time: Moment(new Date(2050, 0, 1)).format('YYYY-MM-DD HH:mm:ss')
}) {
    const valueToken = localStorage.getItem('userToken');

    return axios ({
        method: 'get',
        url: `${API_URL}/api/booking/${type}/${uuid}`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        params: data
    }).catch(error => {
        handleErrorServer(error.response.status);
        throw error;
    });
}

/*
* Принять запрос на бронирование времени тренера или площадки
* bookingId - uuid объекта бронирования
*/
function confirmBooking(bookingId) {
    const valueToken = localStorage.getItem('userToken');

    return axios ({
        method: 'post',
        url: `${API_URL}/api/booking/confirm/${bookingId}`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        }
    }).catch(error => {
        handleErrorServer(error.response.status);
        throw error;
    });
}

/*
* Отменить бронирование
* bookingId - uuid объекта бронирования
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
    }).catch(error => {
        handleErrorServer(error.response.status);
        throw error;
    });
}

/*
* getAllBookingsForUser - Получить все бронирования пользователем.
* По дефолту получаем бронирования от текущего начала дня и до 2050 года.
*/
function getAllBookingsForUser(data = {
    limit: 100,
    offset: 0,
    start_time: dataTime().start_time,
    // start_time: Moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss'), // Note: дату и время преобразовываем в UTC формат
    end_time: Moment(new Date(2050, 0, 1)).utc().format('YYYY-MM-DD HH:mm:ss') // Note: дату и время преобразовываем в UTC формат
}) {// TODO
    const valueToken = localStorage.getItem('userToken');

    return axios({
        method: 'get',
        url: `${API_URL}/api/booking/all`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        params: data
    }).catch(error => {
        handleErrorServer(error.response.status);
        throw error;
    });
}