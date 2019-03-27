import { 
    GET_TRAINER_INFO_START, 
    GET_TRAINER_INFO_SUCCESS, 
    GET_TRAINER_INFO_FAILURE    
} from '../constants/trainerInfo';

import { trainerInfoService } from '../../services/trainerInfoService';

export function getTrainerInfo(trainerId) {
    return dispatch => {
        dispatch(start());

        trainerInfoService.getTrainerInformation(trainerId).then(
            res => {
                dispatch(success(res));
            },
            error => {
                dispatch(failure(error));
            }
        )
    }

    function start() {
        return {
            type: GET_TRAINER_INFO_START
        }
    }

    function success(response) {
        return {
            type: GET_TRAINER_INFO_SUCCESS,
            payload: response
        }
    }

    function failure(error) {
        return {
            type: GET_TRAINER_INFO_FAILURE,
            payload: error
        }
    }
}