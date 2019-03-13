import React, { Component, Fragment } from 'react';

// Note: components
import DeclineBookingModal from '../Modal/DeclineBookingModal'; 
import Button from '../ui-kit/Button/Button';

import { convertTypeMoney } from '../../helpers/convertTypeMoney';

class BookingRequestItem extends Component {

    state = {
        showModal: false
    }

    openModal = () => {
        this.setState({ showModal: true });
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        const { 
            bookingId, 
            firtsName, 
            lastName, 
            tel, 
            nameCourt, 
            time, 
            onClickConfirm, 
            onClickDecline,
            price
        } = this.props;

        return(
            <Fragment>
                <div className="b-booking-request__item">
                    <div className="info-block">
                        <p className="info-block__title">От</p>
                        <p className="info-block__text">{firtsName} {lastName}</p>
                    </div>

                    <div className="info-block">
                        <p className="info-block__title">Телефон</p>
                        <p className="info-block__text">
                            <a className="b-booking-request__player-tel" href={`tel:${tel}`}>{tel}</a>
                        </p>
                    </div>

                    <div className="info-block">
                        <p className="info-block__title">Корт</p>
                        { nameCourt
                            ? <p className="info-block__text">{nameCourt}</p>
                            : '---'
                        }
                    </div>

                    <div className="info-block">
                        <p className="info-block__title">Когда</p>
                        <p className="info-block__text">{time}</p>
                    </div>

                    <div className="info-block info-block--accent">
                        <p className="info-block__title">К оплате:</p>
                        <p className="info-block__text">{convertTypeMoney(price, 'RUB', 'banknote')} ₽</p>
                    </div>

                    <div className="b-booking-request__buttons">
                        <Button 
                            name="Принять"
                            modif="b-button--full"
                            onClick={(e) => {onClickConfirm(e, bookingId)}}
                        />
                        <Button 
                            name="Отказать"
                            modif="b-button--full b-button--hollow"
                            onClick={this.openModal}
                        />
                    </div>
                </div>

                <DeclineBookingModal 
                    isOpenModal={this.state.showModal}
                    closeModal={this.closeModal}
                    onClickDecline={(note) => onClickDecline(bookingId, note)}
                    nameButton="Отказать в бронировании"
                />
            </Fragment>
        )
    }
}

export default BookingRequestItem;