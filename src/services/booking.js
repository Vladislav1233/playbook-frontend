import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';

export const bookingService = {
    createBooking
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