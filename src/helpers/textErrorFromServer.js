function textErrorFromServer(responseServer) {
    if (responseServer.response.status === 401) {
        return undefined
    }
    if(responseServer.response.data.data) {
        return responseServer.response.data.data[Object.keys(responseServer.response.data.data)[0]][0]
    }
    
    return responseServer.response.data.message
}

export default textErrorFromServer;