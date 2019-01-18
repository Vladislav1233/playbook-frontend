// Note: Входящие запросы на бронирование времени тренера

import React, { Component } from 'react';
import { connect } from "react-redux";
import { getBookings } from '../../store/actions/booking';

// Note: Components
import BookingRequest from '../../components/BookingRequest';

// Note: styles
import '../../style/bem-blocks/b-trainer-booking-request/index.scss';

class TrainerBookingRequest extends Component {
    componentDidMount() {
        const userId = localStorage.getItem('userId');
        this.props.getBookings('trainer', userId);
    }

    render() {
        return(
            <div className="b-trainer-booking-request">
                <h1>Входящие запросы на бронирование времени тренера</h1>
                <BookingRequest />
            </div>
        )
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        /*
        * Получить входящие запросы на бронирование времени тренера или площадки
        * type (required) - trainer or playground
        * id - trainer or playground id
        */
       getBookings: (type, id) => dispatch(getBookings(type, id))
    }
}

export default connect(null, mapStateToDispatch)(TrainerBookingRequest);
