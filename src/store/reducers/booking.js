import {
    GET_BOOKINGS_START,
    GET_BOOKINGS_SUCCESS,
    GET_BOOKINGS_FAILURE,

    CONFIRM_BOOKINGS_START,
    CONFIRM_BOOKINGS_SUCCESS,
    CONFIRM_BOOKINGS_FAILURE,

    CREATE_BOOKING_START,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAILURE,

    DECLINE_BOOKING_START,
    DECLINE_BOOKING_SUCCESS,
    DECLINE_BOOKING_FAILURE,

    GET_ALL_BOOKINGS_FOR_USER_START,
    GET_ALL_BOOKINGS_FOR_USER_SUCCESS,
    GET_ALL_BOOKINGS_FOR_USER_FAILURE
} from '../constants/booking';
import { ANALIZE_DATE_TIME_ZONE } from '../constants/formatDates';

import moment from 'moment';
import 'moment/locale/ru';

const initialState = {
    preloader: false,
    dataBookingRequest: [], // Note: текущие не подтвержденные заявки
    dataPastBooking: [], // Note: прошедшие не подтвержденные заявки
    confirmBooking: [], // Note: текущие подтвержденные заявки
    confirmPastBooking: [], // Note: прошедшие подтвержденные заявки
    dataMyBooking: [] // Note: Текущие бронирования пользователя
}

export default function(state = initialState, action) {

    const filterBooking = (confirmId, startTimeConfirm) => {
        const momentIsAfter = moment().isAfter(moment(startTimeConfirm, ANALIZE_DATE_TIME_ZONE));

        if (!momentIsAfter) { // Note: если заявка не истекла, то удаляем элемент из текущих заявок
            return {
                ...state,
                dataBookingRequest: state.dataBookingRequest.filter(itemState => {
                    return confirmId !== itemState.bookingId
                })
            }
        } else if (momentIsAfter) { // Если заявка истекла, то удаляем её из прошедших заявок
            return {
                ...state,
                dataPastBooking: state.dataPastBooking.filter(itemState => {
                    return confirmId !== itemState.bookingId
                })
            }
        } 
            return {
                ...state
            }
        
    }

    switch (action.type) {
        case GET_BOOKINGS_START:
            return {
                ...state,
                preloader: true
            }
            
        case GET_BOOKINGS_SUCCESS: {
            let newDataBookingRequest = [];
            let newPastBooking = [];
            let newConfirmBooking = [];
            let newConfirmPastBooking = [];
            
            // Note: функция, которая возвращает объект c данными одного запроса на бронирование.
            const createDataBookingRequest = function(item) {
                const startTime = moment(item.start_time, ANALIZE_DATE_TIME_ZONE);
                const endTime = moment(item.end_time, ANALIZE_DATE_TIME_ZONE);
                return {
                    firtsName: item.creator.first_name,
                    lastName: item.creator.last_name,
                    tel: `+${item.creator.phone}`,
                    nameCourt: item.playground ? item.playground.name : '',
                    // Note: Преобразовываем UTC время в местное (с сервера приходит UTC).
                    time: `${startTime.format('DD.MM.YYYY (dddd): HH:mm')} - ${endTime.format('HH:mm')}`,
                    startTime: startTime,
                    endTime: endTime,
                    bookingId: item.uuid,
                    status: item.status,
                    price: item.price,
                    playgroundSchedule: item.playground ? item.playground.schedules : [],
                    equipment_rent: item.equipment_rent
                }
            };
            
            // Note: сортируем все запросы на бронирование по категориям относящимся к времени и статусу(обработано/не обработано).
            action.payload.data.data.forEach(item => {
                const momentStartTime = moment(item.start_time, ANALIZE_DATE_TIME_ZONE);

                if (!moment().isAfter(momentStartTime) && !item.status) { // Note: если заявка не истекла и не обработана

                    newDataBookingRequest.push(createDataBookingRequest(item));

                } else if (moment().isAfter(momentStartTime) && !item.status) { // Note: если заявка истекла и не обработана
                    
                    newPastBooking.push(createDataBookingRequest(item));

                } else if (!moment().isAfter(momentStartTime) && item.status) { // Note: если завяка не истекла и обработана
                    
                    newConfirmBooking.push(createDataBookingRequest(item));

                } else { // Note: если заявка истекла и обработана
                    
                    newConfirmPastBooking.push(createDataBookingRequest(item));

                }
            });

            return {
                ...state,
                dataBookingRequest: newDataBookingRequest,
                dataPastBooking: newPastBooking,
                confirmBooking: newConfirmBooking,
                confirmPastBooking: newConfirmPastBooking,
                preloader: false
            }
        }

        case GET_BOOKINGS_FAILURE:
            return {
                ...state,
                preloader: false
            }

        case CONFIRM_BOOKINGS_START:
            return {
                ...state,
                preloader: true
            }
        
        case CONFIRM_BOOKINGS_SUCCESS: {
            const confirmId = action.payload.data.data.uuid;
            const startTimeConfirm = action.payload.data.data.start_time;

            const newStateConfirm = filterBooking(confirmId, startTimeConfirm);
            
            return {
                ...newStateConfirm,
                preloader: false
            }
        }
        
        case CONFIRM_BOOKINGS_FAILURE:
            return {
                ...state,
                preloader: false
            }

        case CREATE_BOOKING_START:
            return {
                ...state,
                preloader: true
            }

        case CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                preloader: false
            }
        
        case CREATE_BOOKING_FAILURE:
            return {
                ...state,
                preloader: false
            }

        case DECLINE_BOOKING_START: 
            return {
                ...state,
                preloader: true
            }

        case DECLINE_BOOKING_SUCCESS: {
            const confirmIdDecline = action.payload.data.data.uuid;
            const startTimeConfirmDecline = action.payload.data.data.start_time;
            
            const newStateDecline = filterBooking(confirmIdDecline, startTimeConfirmDecline);
            const newDataMyBooking = state.dataMyBooking.map(item => {
                if(item.uuid === confirmIdDecline) {
                    item.status = action.payload.data.data.status;
                    item.note = action.payload.data.data.note;
                    return item;
                } 
                    return item;
                // eslint-disable-next-line
                ;
            });

            return {
                ...newStateDecline,
                dataMyBooking: newDataMyBooking,
                preloader: false
            }
        }

        case DECLINE_BOOKING_FAILURE:
            return {
                ...state,
                preloader: false
            }

        case GET_ALL_BOOKINGS_FOR_USER_START:
            return {
                ...state,
                preloader: true
            }
        
        case GET_ALL_BOOKINGS_FOR_USER_SUCCESS:
            return {
                ...state,
                preloader: false,
                dataMyBooking: action.payload.data.data
            }

        case GET_ALL_BOOKINGS_FOR_USER_FAILURE:
            return {
                ...state,
                preloader: false
            }

        default:
            return {
                ...state
            }
    }
}