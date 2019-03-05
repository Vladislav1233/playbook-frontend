function textErrorFromServer(responseServer) {
    return responseServer.response.data[Object.keys(responseServer.response.data)[0]][0]
};

export default textErrorFromServer;