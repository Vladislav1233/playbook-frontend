import React, { Component } from 'react';

// Note: components
import Button from '../ui-kit/Button/Button';

// Note: styles
import '../../style/bem-blocks/b-booking-request/index.scss';

class BookingRequest extends Component {
    render() {
        const { dataBookingRequest, onClickConfirm, onClickNotConfirm, dataPastBooking } = this.props;
        console.log(this.props);

        const itemTemplate = (bookingId, firtsName, lastName, tel, nameCourt, time) => {
            return (
                <div key={bookingId} className="b-booking-request__item">
                    <div className="b-booking-request__player-name">{firtsName} {lastName}</div>
                    <a className="b-booking-request__player-tel" href={`tel:${tel}`}>{tel}</a>

                    <div className="b-booking-request__training">
                        <div className="b-booking-request__training-playground">{nameCourt}</div>
                        <div className="b-booking-request__training-time">{time}</div>
                    </div>

                    <div className="b-booking-request__button">
                        <div className="b-booking-request__button-item">
                            <Button 
                                name="Принять"
                                modif="b-button--full"
                                onClick={(e) => {onClickConfirm(e, bookingId)}}
                            />
                        </div>
                        <div className="b-booking-request__button-item">
                            <Button 
                                name="Отказать"
                                modif="b-button--full"
                                onClick={onClickNotConfirm ? onClickNotConfirm : () => {}}
                            />
                        </div>
                    </div>
                </div>
            );
        };

        return(
            <div className="b-booking-request">
                
                {dataBookingRequest.length > 0 ? 
                    dataBookingRequest.map(item => {
                        return itemTemplate(
                                item.bookingId,
                                item.firtsName,
                                item.lastName,
                                item.tel,
                                item.nameCourt,
                                item.time,
                                item.bookingId)

                    }) : <p>Нет текущих заявок</p>
                }
                
                {dataPastBooking.length > 0 
                    ? <h2>Прошедшие заявки</h2>
                    : null
                }
                {dataPastBooking.length > 0 ? 
                    dataPastBooking.map(item => {
                        return itemTemplate(
                                item.bookingId,
                                item.firtsName,
                                item.lastName,
                                item.tel,
                                item.nameCourt,
                                item.time,
                                item.bookingId)
                    }) : null}
            </div>
        )
    }
}

export default BookingRequest;