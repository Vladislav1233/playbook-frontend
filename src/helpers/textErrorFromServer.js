function textErrorFromServer(responseServer) {
    console.log(responseServer.response);
    if(responseServer.response.data.message === 'Unauthorized') {
        return 'Ошибка! Неверный номер или пароль.'
    } else if(responseServer.response.data.data) {
        return responseServer.response.data.data[Object.keys(responseServer.response.data.data)[0]][0]
    }
    
    return responseServer.response.data.message
}

export default textErrorFromServer;