import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';
import { handleErrorServer } from '../helpers/handleErrorServer';

export const equipment = {
    getAllEquipmentsForBookable,
    createEquipment
}

/*
* bookable_type - Trainer or playground
* bookable_uuid - Bookable uuid
*/
function getAllEquipmentsForBookable(bookable_type, bookable_uuid) {
    return axios ({
        method: 'get',
        url: `${API_URL}/api/equipment/${bookable_type}/${bookable_uuid}`
    }).catch(error => {
        handleErrorServer(error.response.status);
        throw error;
    });
};

/*
* Создание дополнительных услуг.
* data - Объект:
* "name": "TENNIS RACKET",
* "price_per_hour": "2000",
* "currency": "USD",
* "availability": "1"
*/
function createEquipment(data) {
    const valueToken = localStorage.getItem('userToken');

    return axios ({
        method: 'post',
        url: `${API_URL}/api/equipment/create`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        data: data
    }).catch(error => {
        handleErrorServer(error.response.status);
        throw error;
    });
}