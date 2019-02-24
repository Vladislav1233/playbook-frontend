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
        const { dataMyBooking } = this.props;
        console.log(dataMyBooking);
        return(
            <div className="b-my-booking">
                <div className="container">
                    <h1>Мои бронирования</h1>

                    <div className="b-booking-request">
                        {dataMyBooking
                            ? dataMyBooking.map(item => {
                                return (
                                    <div key={item.id} className="b-booking-request__item">
                                        <MyBookingCard 
                                            bookableFirstName={item.bookable.first_name}
                                            bookableLastName={item.bookable.last_name}
                                            playgroundName={item.playground.name}
                                            playgroundAddress={item.playground.address}
                                            startTime={item.start_time}
                                            endTime={item.end_time}
                                            price={item.price}
                                        />
                                    </div>
                               )
                            })

                            : <p>У вас нет текущих броней</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ booking }) => {
    return {
        dataMyBooking: booking.dataMyBooking
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllBookingsForUser: () => dispatch(getAllBookingsForUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBooking);
