// Note: Входящие запросы на бронирование времени тренера

import React, { Component } from 'react';
import { connect } from "react-redux";

class TrainerBookingRequest extends Component {
    render() {
        return(
            <div>
                <h1>Входящие запросы на бронирование времени тренера</h1>
            </div>
        )
    }
}

export default connect()(TrainerBookingRequest);
