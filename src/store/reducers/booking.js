import {
    GET_BOOKINGS_START,
    GET_BOOKINGS_SUCCESS,
    GET_BOOKINGS_FAILURE,

    CONFIRM_BOOKINGS_START,
    CONFIRM_BOOKINGS_SUCCESS,
    CONFIRM_BOOKINGS_FAILURE
} from '../constants/booking';

import moment from 'moment';
import 'moment/locale/ru';
// eslint-disable-next-line
import twix from 'twix';

const initialState = {
    dataBookingRequest: [], // Note: текущие не подтвержденные заявки
    dataPastBooking: [], // Note: прошедшие не подтвержденные заявки
    confirmBooking: [], // Note: текущие подтвержденные заявки
    confirmPastBooking: [] // Note: прошедшие подтвержденные заявки
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_BOOKINGS_START:
            return {
                ...state
            }
            
        case GET_BOOKINGS_SUCCESS:
            let newDataBookingRequest = [];
            let newPastBooking = [];
            let newConfirmBooking = [];
            let newConfirmPastBooking = [];
            
            action.payload.data.data.forEach(item => {
                if (!moment().isAfter(item.start_time) && !item.status) { // Note: если заявка не истекла и не обработана
                    console.log(item);
                    newDataBookingRequest.push({
                        firtsName: item.creator.first_name,
                        lastName: item.creator.last_name,
                        tel: `+${item.creator.phone}`,
                        nameCourt: 'LawnTennis', // TODO
                        time: `${moment(item.start_time).format('DD.MM.YYYY')} (${moment(item.start_time).format('dddd')}): ${moment(item.start_time).format('HH:mm')} - ${moment(item.end_time).format('HH:mm')}`,
                        bookingId: item.id,
                        status: item.status
                    })
                } else if (moment().isAfter(item.start_time) && !item.status) { // Note: если заявка истекла и не обработана
                    newPastBooking.push({
                        firtsName: item.creator.first_name,
                        lastName: item.creator.last_name,
                        tel: `+${item.creator.phone}`,
                        nameCourt: 'LawnTennis', // TODO
                        time: `${moment(item.start_time).format('DD.MM.YYYY')} (${moment(item.start_time).format('dddd')}): ${moment(item.start_time).format('HH:mm')} - ${moment(item.end_time).format('HH:mm')}`,
                        bookingId: item.id,
                        status: item.status
                    })
                } else if (!moment().isAfter(item.start_time) && item.status) { // Note: если завяка не истекла и обработана
                    newConfirmBooking.push({
                        firtsName: item.creator.first_name,
                        lastName: item.creator.last_name,
                        tel: `+${item.creator.phone}`,
                        nameCourt: 'LawnTennis', // TODO
                        time: `${moment(item.start_time).format('DD.MM.YYYY')} (${moment(item.start_time).format('dddd')}): ${moment(item.start_time).format('HH:mm')} - ${moment(item.end_time).format('HH:mm')}`,
                        bookingId: item.id,
                        status: item.status
                    })
                } else { // Note: если заявка истекла и обработана
                    newConfirmPastBooking.push({
                        firtsName: item.creator.first_name,
                        lastName: item.creator.last_name,
                        tel: `+${item.creator.phone}`,
                        nameCourt: 'LawnTennis', // TODO
                        time: `${moment(item.start_time).format('DD.MM.YYYY')} (${moment(item.start_time).format('dddd')}): ${moment(item.start_time).format('HH:mm')} - ${moment(item.end_time).format('HH:mm')}`,
                        bookingId: item.id,
                        status: item.status
                    })
                }
            });

            return {
                ...state,
                dataBookingRequest: newDataBookingRequest,
                dataPastBooking: newPastBooking,
                confirmBooking: newConfirmBooking,
                confirmPastBooking: newConfirmPastBooking
            }

        case GET_BOOKINGS_FAILURE:
            console.log(action.payload);
            return {
                ...state
            }

        case CONFIRM_BOOKINGS_START:
            return {
                ...state
            }
        
        case CONFIRM_BOOKINGS_SUCCESS:
            const confirmId = action.payload.data.data.id;
            const startTimeConfirm = action.payload.data.data.start_time;

            console.log(action.payload, confirmId);

            if (!moment().isAfter(startTimeConfirm)) { // Note: если заявка не истекла, то удаляем элемент из текущих заявок
                return {
                    ...state,
                    dataBookingRequest: state.dataBookingRequest.filter(itemState => {
                        console.log(confirmId, itemState.bookingId);
                        return confirmId !== itemState.bookingId
                    })
                }
            } else if (moment().isAfter(startTimeConfirm)) { // Если заявка истекла, то удаляем её из прошедших заявок
                return {
                    ...state,
                    dataPastBooking: state.dataPastBooking.filter(itemState => {
                        console.log(confirmId, itemState.bookingId);
                        return confirmId !== itemState.bookingId
                    })
                }
            } else {
                return {
                    ...state
                }
            }
        
        case CONFIRM_BOOKINGS_FAILURE:
            console.log(action.payload);
            return {
                ...state
            }

        default:
            return {
                ...state
            }
    }
}