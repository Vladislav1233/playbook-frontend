import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';

export const trainerInfoService = {
    postTrainerInformation,
    getTrainerInformation
}

function postTrainerInformation(data) {
    let valueToken = localStorage.getItem('userToken');

    return axios({
        method: 'post',
        url: `${API_URL}/api/trainer/info/create`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        data: data
    })
}

function getTrainerInformation(trainerId) {
    return axios({
        method: 'get',
        url: `${API_URL}/api/trainer/info/${trainerId}`
    })
}