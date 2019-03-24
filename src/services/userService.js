import { authHeader } from '../helpers/auth-header';
import { API_URL } from '../store/constants/restAPI';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    resendVerificationCode,
    resetPasswordRequest,
    getAll,
    getById,
    // update,
    delete: _delete
};

function register(user) {
    return axios({
        method: 'post',
        url: `${API_URL}/api/register`,
        data: user
    });
}

// TODO: В логине реализовать функцию handleResponse, она есть в примере и обрабатывает ошибки логина. Её пример в конце файла
function login(data) {
    return axios({
        method: 'post',
        url: `${API_URL}/api/login`,
        data: data
    }).then(user => {
            if (user.data.data.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('userToken', user.data.data.access_token);
                // Note: Храним роль юзера
                localStorage.setItem('userRole', JSON.stringify(user.data.data.roles));
                // Note: храним uuid юзера
                localStorage.setItem('userId', user.data.data.uuid);
                // Note: храним информацию о юзере
                const userInformation = {
                    first_name: user.data.data.first_name,
                    last_name: user.data.data.last_name
                };
                localStorage.setItem('userInformation', JSON.stringify(userInformation));
            }
            // Note: Возвращаем данные юзера в reducer.
            return user.data.data;
        });
}

function logout() {
    const valueToken = localStorage.getItem('userToken');

    return axios({
        method: 'post',
        url: `${API_URL}/api/logout`,
        headers: {
            'Authorization': `Bearer ${valueToken}`
        }
    }).then(res => {
        if(res.data.success) {
            //Note: remove user from local storage to log user out
            localStorage.removeItem('userToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userId');
            localStorage.removeItem('userInformation');
        }
        return res.data.data
    });
}

/*
* resendVerificationCode - функция получения кода для регистрации в системе (сброс своего пароля)
* data = {
*   phone: номер телефона, на который отправится код    
*}
*/
function resendVerificationCode(data) {

    return axios({
        method: 'post',
        url: `${API_URL}/api/resend_verification_code`,
        data: data
    });
}

function resetPasswordRequest(data) {
    return axios({
        method: 'post',
        url: `${API_URL}/api/reset_password`,
        data: data
    });
}


// Код ниже не закончен
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API_URL}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${API_URL}/users/${user.id}`, requestOptions).then(handleResponse);;
// }

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}