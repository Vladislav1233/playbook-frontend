import React, { Component } from 'react';
import { connect } from "react-redux";

import { getAllBookingsForUser } from '../../store/actions/booking';

// Note: components
import MyBookingCard from '../../components/MyBookingCard';

// Note: styles
import '../../style/bem-blocks/b-my-booking/index.scss';

class MyBooking extends Component {
    componentDidMount() {
        this.props.getAllBookingsForUser();
    }

    render() {
        return(
            <div className="b-my-booking">
                <div className="container">
                    <h1>Мои бронирования</h1>

                    <div className="b-booking-request">
                        <div className="b-booking-request__item">
                            <MyBookingCard />
                        </div>

                        <div className="b-booking-request__item">
                            <MyBookingCard s/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllBookingsForUser: () => dispatch(getAllBookingsForUser())
    }
}

export default connect(null, mapDispatchToProps)(MyBooking);
