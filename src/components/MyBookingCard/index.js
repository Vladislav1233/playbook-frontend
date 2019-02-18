import React, { Component, Fragment } from 'react';

// Note: components
// import DeclineBookingModal from '../Modal/DeclineBookingModal'; 

// Note: styles
import '../../style/bem-blocks/b-my-booking-card/index.scss';
import '../../style/bem-blocks/b-cost-information/index.scss';

class MyBookingCard extends Component {
    render() {
        return(
            <Fragment>

                {this.props.s ? 
                <div className="b-my-booking-card">
                    <div className="b-my-booking-card__type">Забронировано: Площадка</div>
                    <div className="b-my-booking-card__time">
                        18.02.2019 (понедельник)<br/>
                        10:00 - 11:00
                    </div>

                    <div className="b-my-booking-card__playground">
                        <div className="b-my-booking-card__playground-name">Ulgu</div>
                        <div className="b-my-booking-card__playground-address">ул. Хабенского, 88</div>
                    </div>

                    <div className="b-cost-information">
                        <div className="b-cost-information__cost">700 рублей</div>
                    </div>
                </div> 
            : 
                <div className="b-my-booking-card">
                    <div className="b-my-booking-card__type">Забронировано: Тренер</div>
                    <div className="b-my-booking-card__time">
                        18.02.2019 (понедельник)<br/>
                        10:00 - 11:00
                    </div>

                    <div className="b-my-booking-card__name-trainer">Елена Намунка</div>

                    <div className="b-my-booking-card__playground">
                        <div className="b-my-booking-card__playground-name">Ulgu</div>
                        <div className="b-my-booking-card__playground-address">ул. Хабенского, 88</div>
                    </div>

                    <div className="b-cost-information">
                        <div className="b-cost-information__cost">700 рублей</div>
                    </div>
                </div>
            }
            </Fragment>
        )
    }
}

export default MyBookingCard;