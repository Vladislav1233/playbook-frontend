import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';

export const playgroundService = {
    searchPlayground
}

function searchPlayground(data) {
    let valueToken = localStorage.getItem('userToken');

    return axios({
        method: 'get',
        url: `${API_URL}/api/playground/search`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        params: data
    })
}