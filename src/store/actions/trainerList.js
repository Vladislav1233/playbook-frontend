import { 
    GET_TRAINER_LIST_START, 
    GET_TRAINER_LIST_SUCCESS, 
    GET_TRAINER_LIST_FAILURE, 

    CLEAR_TRAINER_LIST_STORE    
} from '../constants/trainerList';

import { trainerInfoService } from '../../services/trainerInfoService';

export function getTrainerList(data) {
    return dispatch => {
        dispatch(start());

        trainerInfoService.getTrainerList(data).then(
            res => {
                dispatch(success(res));
            },
            error => {
                console.log(error);
                dispatch(failure(error));
            }
        )
    }

    function start() {
        return {
            type: GET_TRAINER_LIST_START
        }
    }

    function success(response) {
        return {
            type: GET_TRAINER_LIST_SUCCESS,
            payload: response
        }
    }

    function failure(error) {
        return {
            type: GET_TRAINER_LIST_FAILURE,
            payload: error
        }
    }
}

export function clearTrainerListStore() {
    return {
        type: CLEAR_TRAINER_LIST_STORE
    }
} 