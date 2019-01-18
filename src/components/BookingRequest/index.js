import React, { Component } from 'react';

// Note: components
import Button from '../ui-kit/Button/Button';

// Note: styles
import '../../style/bem-blocks/b-booking-request/index.scss';

const dataBookingRequest = [{
    firtsName: 'Владислав',
    lastName: 'Довженко',
    tel: '+79176297124',
    nameCourt: 'LawnTennis',
    time: '12.01.2019 (воскресенье): 12:00 - 14:00'
}, {
    firtsName: 'Максим',
    lastName: 'Гришин',
    tel: '+79015467322',
    nameCourt: 'LawnTennis',
    time: '12.01.2019 (воскресенье): 18:00 - 19:00'
}]

class BookingRequest extends Component {
    render() {
        return(
            <div className="b-booking-request">
                {dataBookingRequest.map((item, index) => {
                    return (
                        <div key={index} className="b-booking-request__item">
                            <div className="b-booking-request__player-name">{item.firtsName} {item.lastName}</div>
                            <a className="b-booking-request__player-tel" href={`tel:${item.tel}`}>{item.tel}</a>

                            <div className="b-booking-request__training">
                                <div className="b-booking-request__training-playground">{item.nameCourt}</div>
                                <div className="b-booking-request__training-time">{item.time}</div>
                            </div>

                            <div className="b-booking-request__button">
                                <div className="b-booking-request__button-item">
                                    <Button 
                                        name="Принять"
                                        modif="b-button--full"
                                    />
                                </div>
                                <div className="b-booking-request__button-item">
                                    <Button 
                                        name="Отказать"
                                        modif="b-button--full"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default BookingRequest;