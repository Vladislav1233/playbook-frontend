import { userConstants } from '../store/constants/userConstants';
import { alertActions } from '../store/actions/alertAction';
import { store } from '../index';

export function handleErrorServer(codeError) {
    // const store = configureStore();
    // Note: 401 ошибка - Unauthorized.
    if (codeError === 401) {
        store.dispatch({
            type: userConstants.LOGOUT_SUCCESS
        });
        store.dispatch(alertActions.error('Вы неавторизованный пользователь. Чтобы выполнить данное действие вам нужно авторизоваться'));
    }
};