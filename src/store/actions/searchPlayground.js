import { 
    GET_START_SEARCH_PLAYGROUND, 
    GET_SUCCESS_SEARCH_PLAYGROUND, 
    GET_FAILURE_SEARCH_PLAYGROUND, 
    CLEAR_SEARCH_PLAYGROUND 
} from '../constants/searchPlayground';
import { handleErrorServer } from '../../helpers/handleErrorServer';

import { playgroundService } from '../../services/playgroundService';

// Note: Отправляем запрос на поиск площадки
export function searchPlayground(data) {
    return dispatch => {
        dispatch(start());
        
        playgroundService.searchPlayground(data)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error));
                    handleErrorServer(error.response.status);
                }
            )
    }

    function start() {
        return {
            type: GET_START_SEARCH_PLAYGROUND
        }
    }

    function success(response) {
        return {
            type: GET_SUCCESS_SEARCH_PLAYGROUND,
            payload: response.data
        }
    }

    function failure(error) {
        return {
            type: GET_FAILURE_SEARCH_PLAYGROUND,
            payload: error
        }
    }

}

export function clearSearchPlayground() {
    return {
        type: CLEAR_SEARCH_PLAYGROUND
    } 
}