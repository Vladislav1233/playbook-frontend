import {
    GET_BOOKINGS_START,
    GET_BOOKINGS_SUCCESS,
    GET_BOOKINGS_FAILURE
} from '../constants/booking';

const initialState = {
    dataBookingRequest: [{
        firtsName: 'Владислав',
        lastName: 'Довженко',
        tel: '+79176297124',
        nameCourt: 'LawnTennis',
        time: '12.01.2019 (воскресенье): 12:00 - 14:00'
    }, {
        firtsName: 'Максим',
        lastName: 'Гришин',
        tel: '+79015467322',
        nameCourt: 'LawnTennis',
        time: '12.01.2019 (воскресенье): 18:00 - 19:00'
    }]
}

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            return {
                ...state
            }
    }
}