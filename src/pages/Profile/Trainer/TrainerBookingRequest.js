// Note: Входящие запросы на бронирование времени тренера

import React, { Component } from 'react';
import { connect } from "react-redux";
import { getBookings, confirmBooking, declineBooking } from '../../../store/actions/booking';

// Note: Components
import BookingRequest from '../../../components/BookingRequest';
import Preloader from '../../../components/Preloader/Preloader';

// Note: styles
import '../../../style/bem-blocks/b-trainer-booking-request/index.scss';

class TrainerBookingRequest extends Component {
    componentDidMount() {
        const { userId, getBookings } = this.props;
        getBookings('trainer', userId);
    }

    onClickConfirm = (e, bookingId) => {
        e.preventDefault();
        this.props.confirmBooking(bookingId);
    }

    onClickDecline = (bookingId, note) => {
        const data = {
            note
        };
        this.props.declineBooking(bookingId, data);
    }

    render() {
        const { dataBookingRequest, dataPastBooking } = this.props;
        console.log(this.props)

        return(
            <div className="b-trainer-booking-request">
                <h1>Входящие запросы на бронирование времени тренера</h1>
                <BookingRequest 
                    dataBookingRequest={dataBookingRequest}
                    onClickConfirm={this.onClickConfirm}
                    dataPastBooking={dataPastBooking}
                    onClickDecline={this.onClickDecline}
                />

                { this.props.preloader ? <Preloader /> : null }
            </div>
        )
    }
}

const mapStateToProps = ({ booking, identificate }) => {    
    return {
        dataBookingRequest: booking.dataBookingRequest,
        dataPastBooking: booking.dataPastBooking,
        userId: identificate.userId,
        preloader: booking.preloader
    }
};

const mapStateToDispatch = (dispatch) => {
    return {
        /*
        * Получить входящие запросы на бронирование времени тренера или площадки
        * type (required) - trainer or playground
        * uuid - trainer or playground uuid
        */
        getBookings: (type, uuid) => dispatch(getBookings(type, uuid)),
        /*
        * Принять запрос на бронирование времени тренера или площадки
        * bookingId - uuid объекта бронирования
        */
        confirmBooking: (bookingId) => dispatch(confirmBooking(bookingId)),
        /*
        * Отменить бронирование
        * bookingId - uuid объекта бронирования
        * data: {
        *   note: 'Сообщение пользователю'
        *}
        */
       declineBooking: (bookingId, data) => dispatch(declineBooking(bookingId, data))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(TrainerBookingRequest);
