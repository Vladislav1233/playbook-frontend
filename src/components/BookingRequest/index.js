import React, { Component, Fragment } from 'react';

// Note: components
import BookingRequestItem from './BookingRequestItem';

// Note: styles
import '../../style/bem-blocks/b-booking-request/index.scss';

class BookingRequest extends Component {

    render() {
        const { dataBookingRequest, onClickConfirm, dataPastBooking, onClickDecline } = this.props;

        return(
            <div className="b-booking-request">
                <h3>Актуальные заявки:</h3>
                <div className="b-booking-request__list">
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
                                onClickDecline={onClickDecline}
                                tel={item.tel}
                            />
                        }) : <p>Нет текущих заявок.</p>
                    }
                </div>
                
                {dataPastBooking.length > 0 ? 
                    <Fragment>
                        <h3>Устаревшие заявки:</h3>
                        <div className="b-booking-request__list b-booking-request__list--old">
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
                                    onClickDecline={onClickDecline}
                                    tel={item.tel}
                                />
                            })}
                        </div>
                    </Fragment> : null}
            </div>
        )
    }
}

export default BookingRequest;