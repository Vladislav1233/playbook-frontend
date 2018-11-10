import { POST, PUT, CONTENT_TYPE, API_URL } from '../store/constants/restAPI';

export const requestApi = ({
    types,
    url,
    method,
    params = {},
    contentType = ''
}: {
    types: string[],
    url: Function,
    method: string,
    messages?: string[],
    contentType?: string,
    successMessageByResponse?: Function,
    params?: Object,
    onSuccess?: Function,
    onError?: Function
}) => {
    const layer = {};
    const [START, SUCCESS, ERROR] = types;

    // NOTE: Генератор запроса и отправка его (fetch)
    layer[START] = (action, dispatch) => fetch => {
        dispatch({type: START, action});

        const authToken = localStorage.getItem('authToken');
        const headers = {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': 0
        };
        // Для передачи файлов не нужно задавать Content-type
        if (contentType !== CONTENT_TYPE.FORM) {
            headers['Content-Type'] = CONTENT_TYPE.JSON;
        }
        if (authToken) {
            headers.authorization = authToken;
        }
        const body = typeof action.data === 'string' || (contentType === CONTENT_TYPE.FORM) ? action.data : JSON.stringify({ data: action.data });
        return fetch(
            // TODO: ещё сюда закинуть настройку параметров для строки браузера (см. исходник)
            `${API_URL}/${url(action)}`,
            Object.assign(
                {
                    method
                    // TODO: Возможно нужно requestDefaults, поговорить с Ромкой
                },
                method === POST || method === PUT
                    ? {
                        headers: new Headers(headers),
                        body: body
                    }
                    : {
                        headers: new Headers(headers)
                    }
            )
        );
    };

    // NOTE: обработка успешного запроса
    layer[SUCCESS] = (action, dispatch) => (res: Response) => {
        // TODO: Что тут творится? - законсолить все надо, непонятно.
        return new Promise(resolve => {
            res
                .json()
                .then(response => resolve(response))
                .catch(() => resolve(true));
        }).then(response => {
            return dispatch({type: SUCCESS, response, action, headers: res.headers});
        })
    };

    layer[ERROR] = (action, dispatch) => error => {
        return dispatch({ type: ERROR, error, action });
    }

    return layer;
}