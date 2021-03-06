import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';
import { handleErrorServer } from '../helpers/handleErrorServer';

export const trainerInfoService = {
    createTrainerInformation,
    getTrainerInformation,
    editTrainerInformation,
    getTrainerList
}

function createTrainerInformation(data) {
    let valueToken = localStorage.getItem('userToken');

    return axios({
        method: 'post',
        url: `${API_URL}/api/trainer/info/create`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        data: data
    }).catch(error => {
        handleErrorServer(error.response.status);
        throw error;
    })
}

function getTrainerInformation(trainerId) {
    return axios({
        method: 'get',
        url: `${API_URL}/api/trainer/info/${trainerId}`
    }).catch(error => {
        handleErrorServer(error.response.status);
        throw error;
    })
}

function editTrainerInformation(trainer_info_id, data) {
    let valueToken = localStorage.getItem('userToken');

    return axios({
        method: 'post',
        url: `${API_URL}/api/trainer/info/edit/${trainer_info_id}`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        },
        data: data
    }).catch(error => {
        handleErrorServer(error.response.status);
        throw error;
    })
}

function getTrainerList(data) {
    return axios({
        method: 'get',
        url: `${API_URL}/api/trainer/list`,
        params: data
    }).catch(error => {
        handleErrorServer(error.response.status);
        throw error;
    })
}