function textErrorFromServer(responseServer) {
    if(responseServer.response.data.message === 'Unauthorized') {
        return 'Ошибка! Неверный номер или пароль.'
    } else if (responseServer.response.data.message) {
        return responseServer.response.data.message
    } else {
        return responseServer.response.data[Object.keys(responseServer.response.data)[0]][0]
    }
};

export default textErrorFromServer;