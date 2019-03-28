import { userConstants } from '../store/constants/userConstants';
import { store } from '../index';
import { history } from '../helpers/history';

export function handleErrorServer(codeError) {
    // const store = configureStore();
    // Note: 401 ошибка - Unauthorized.
    if (codeError === 401) {
        store.dispatch({
            type: userConstants.LOGOUT_SUCCESS
        });
        localStorage.clear();
        history.push('/authorization');
    }
}