import { userConstants } from '../constants/userConstants';
import { userService } from '../../services/userService';
import { history } from '../../helpers/history';
import { configPathRouter } from '../../App/configPathRouter';
import { alertActions } from './alertAction';
import textErrorFromServer from '../../helpers/textErrorFromServer';

export const userActions = {
    login,
    logout,
    register,
    resendVerificationCode,
    getAll,
    delete: _delete
};

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Вы успешно зарегистрированы. Введите свои данные для входа на сайт.'))
                    history.push(configPathRouter.authorization);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(textErrorFromServer(error)));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function login(data, toMain = true, callback) {
    return dispatch => {
        dispatch(request(data));

        userService.login(data)
            .then(
                user => {
                    dispatch(success(user));

                    if (callback) {
                        callback();
                    };

                    if(toMain) {
                        history.push('/');
                    };
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(textErrorFromServer(error)));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { 
        return { 
            type: userConstants.LOGIN_REQUEST
        } 
    }

    function success(user) { 
        return { 
            type: userConstants.LOGIN_SUCCESS, 
            payload: user
        } 
    }

    function failure(error) { 
        return { 
            type: userConstants.LOGIN_FAILURE, 
            payload: error 
        } 
    }
}

function logout() {
    return dispatch => {
        dispatch(start());

        userService.logout()
            .then(
                res => {
                    dispatch(success(res));
                    history.push('/');
                }, 
                err => {
                    dispatch(failure(err));
                }
            );
    };

    function start() {
        return { 
            type: userConstants.LOGOUT_START
        }
    }

    function success(res) {
        return {
            type: userConstants.LOGOUT_SUCCESS,
            payload: res
        }
    }

    function failure(err) {
        return {
            type: userConstants.LOGOUT_FAILURE,
            payload: err
        }
    }
};

/*
* resendVerificationCode - функция получения кода для регистрации в системе (сброс своего пароля)
* data = {
*   phone: номер телефона, на который отправится код    
*}
*/
function resendVerificationCode(data) {
    return dispatch => {
        dispatch(start());

        userService.resendVerificationCode(data).then(
            res => {
                dispatch(success(res));
            }, 

            err => {
                dispatch(failure(err));
                alert('Ошибка. Смотри network.');
            }
        )
    }

    function start() {
        return { 
            type: userConstants.RESEND_VERIFICATION_CODE_START
        }
    }

    function success(res) {
        return {
            type: userConstants.RESEND_VERIFICATION_CODE_SUCCESS,
            payload: res
        }
    }

    function failure(err) {
        return {
            type: userConstants.RESEND_VERIFICATION_CODE_FAILURE,
            payload: err
        }
    }
}

// Код ниже не закончен и он пока не работает
function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}