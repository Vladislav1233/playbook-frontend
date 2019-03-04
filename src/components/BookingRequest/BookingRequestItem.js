import React, { Component, Fragment } from 'react';

// Note: components
import DeclineBookingModal from '../Modal/DeclineBookingModal'; 
import Button from '../ui-kit/Button/Button';

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
        const { bookingId, firtsName, lastName, tel, nameCourt, time, onClickConfirm, onClickDecline } = this.props;
        console.log(this.props);

        return(
            <Fragment>
                <div className="b-booking-request__item">
                    <div className="b-booking-request__player-name">{firtsName} {lastName}</div>
                    <a className="b-booking-request__player-tel" href={`tel:${tel}`}>{tel}</a>

                    <div className="b-booking-request__training">
                        <div className="b-booking-request__training-playground">{nameCourt}</div>
                        <div className="b-booking-request__training-time">{time}</div>
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