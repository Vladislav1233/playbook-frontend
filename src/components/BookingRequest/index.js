import React, { Component, Fragment } from 'react';

// Note: components
import BookingRequestItem from './BookingRequestItem';

// Note: styles
import '../../style/bem-blocks/b-booking-request/index.scss';

class BookingRequest extends Component {

    render() {
        const { dataBookingRequest, onClickConfirm, dataPastBooking } = this.props;
        console.log(this.props);

        return(
            <div className="b-booking-request">
                
                {dataBookingRequest.length > 0 ? 
                    dataBookingRequest.map(item => {
                        return <BookingRequestItem 
                            key={item.bookingId}
                            booking={item.bookingId}
                            firtsName={item.firtsName}
                            lastName={item.lastName}
                            nameCourt={item.nameCourt}
                            time={item.time}
                            bookingId={item.bookingId} 
                            onClickConfirm={onClickConfirm}
                        />
                    }) : <p>Нет текущих заявок</p>
                }
                
                {dataPastBooking.length > 0 ? 
                    <Fragment>
                        <h2>Прошедшие заявки</h2>
                        {dataPastBooking.map(item => {
                            return <BookingRequestItem 
                                key={item.bookingId}
                                booking={item.bookingId}
                                firtsName={item.firtsName}
                                lastName={item.lastName}
                                nameCourt={item.nameCourt}
                                time={item.time}
                                bookingId={item.bookingId} 
                                onClickConfirm={onClickConfirm}
                            />
                        })}
                    </Fragment> : null}
            </div>
        )
    }
}

export default BookingRequest;