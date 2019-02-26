import React, { Component } from 'react';
import moment from 'moment';

// Note: components
// import DeclineBookingModal from '../Modal/DeclineBookingModal'; 

// Note: helpers
import { convertTypeMoney } from '../../helpers/convertTypeMoney';

// Note: styles
import '../../style/bem-blocks/b-my-booking-card/index.scss';
import '../../style/bem-blocks/b-cost-information/index.scss';

class MyBookingCard extends Component {

    render() {
        const { 
            bookableFirstName,
            bookableLastName,
            playgroundName,
            playgroundAddress,
            startTime,
            endTime,
            price,
            status, // Note: 0 - не подтверждено (не обработана заявка), 1 - подтверждено, 2 - отменено/отклонено.
            note // Note: заметка с причиной отмены бронирования
        } = this.props;

        const typeBookable = bookableFirstName ? 'Тренер' : 'Площадка';

        const howStatus = (_status) => {
            switch(_status) {
                case 0:
                    return 'Ваша заявка ещё не обработана тренером или администратором';
                
                case 1:
                    return 'Бронирование подтверждено';
                
                case 2:
                    return 'Бронирование отменено'
            }
        };

        return(
            <div className="b-my-booking-card">
                <div className="b-my-booking-card__type">Забронировано: {typeBookable}</div>
                <div className="b-my-booking-card__time">
                    {moment(startTime).format('DD.MM.YYYY')} ({moment(startTime).format('dddd')})
                    <br/>
                    {moment(startTime).format('HH:mm')} - {moment(endTime).format("HH:mm")}
                </div>

                <div>
                    <div>Статус: {howStatus(status)}</div>
                    {status === 2 && <div>Причина: {note}</div>}
                </div>

                {bookableFirstName &&
                    <div className="b-my-booking-card__name-trainer">
                        {`${bookableFirstName} ${bookableLastName}`}
                    </div>
                }

                <div className="b-my-booking-card__playground">
                    <div className="b-my-booking-card__playground-name">{playgroundName}</div>
                    <div className="b-my-booking-card__playground-address">{playgroundAddress}</div>
                </div>

                <div className="b-cost-information">
                    <div className="b-cost-information__cost">
                        {convertTypeMoney(price, 'RUB', 'banknote')} ₽
                    </div>
                </div>
            </div>
        )
    }
}

export default MyBookingCard;

// Верстка для площадки
//<div className="b-my-booking-card">
//    <div className="b-my-booking-card__type">Забронировано: Площадка</div>
//    <div className="b-my-booking-card__time">
//      18.02.2019 (понедельник)<br/>
//      10:00 - 11:00
//  </div>
//
//  <div className="b-my-booking-card__playground">
//      <div className="b-my-booking-card__playground-name">Ulgu</div>
//      <div className="b-my-booking-card__playground-address">ул. Хабенского, 88</div>
//  </div>
//
//  <div className="b-cost-information">
//      <div className="b-cost-information__cost">700 рублей</div>
//  </div>
//</div>