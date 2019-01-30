// Note: Входящие запросы на бронирование времени тренера

import React, { Component } from 'react';
import { connect } from "react-redux";
import { getBookings, confirmBooking } from '../../store/actions/booking';

// Note: Components
import BookingRequest from '../../components/BookingRequest';

// Note: styles
import '../../style/bem-blocks/b-trainer-booking-request/index.scss';

class TrainerBookingRequest extends Component {
    componentDidMount() {
        const { userId, getBookings } = this.props;
        getBookings('trainer', userId);
    }

    onClickConfirm = (e, bookingId) => {
        e.preventDefault();
        this.props.confirmBooking(bookingId);
    }

    render() {
        const { dataBookingRequest, dataPastBooking } = this.props;

        return(
            <div className="b-trainer-booking-request">
                <h1>Входящие запросы на бронирование времени тренера</h1>
                <BookingRequest 
                    dataBookingRequest={dataBookingRequest}
                    onClickConfirm={this.onClickConfirm}
                    dataPastBooking={dataPastBooking}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ booking, identificate }) => {
    return {
        dataBookingRequest: booking.dataBookingRequest,
        dataPastBooking: booking.dataPastBooking,
        userId: identificate.userId
    }
};

const mapStateToDispatch = (dispatch) => {
    return {
        /*
        * Получить входящие запросы на бронирование времени тренера или площадки
        * type (required) - trainer or playground
        * id - trainer or playground id
        */
        getBookings: (type, id) => dispatch(getBookings(type, id)),
        /*
        * Принять запрос на бронирование времени тренера или площадки
        * bookingId - id объекта бронирования
        */
        confirmBooking: (bookingId) => dispatch(confirmBooking(bookingId))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(TrainerBookingRequest);
