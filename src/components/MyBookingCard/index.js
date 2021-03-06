import React, { Component, Fragment } from 'react';
import moment from 'moment';
import cn from 'classnames';
import { ANALIZE_DATE_TIME_ZONE } from "../../store/constants/formatDates";

// Note: components
import DeclineBookingModal from '../Modal/DeclineBookingModal';
import EquipmentsRent from '../EquipmentsRent';
import MoneyFromat from '../ui-kit/MoneyFormat';

// Note: helpers
import { convertTypeMoney } from '../../helpers/convertTypeMoney';
import calcCostService from '../../helpers/calcCostService';

// Note: styles
import '../../style/bem-blocks/b-my-booking-card/index.scss';
import '../../style/bem-blocks/b-close/index.scss';

class MyBookingCard extends Component {

    state = {
        showDeclineBookingModal: false
    };

    openDeclineModal = () => {
        this.setState({
            ...this.state,
            declineModal: true
        })
    };

    closeDeclineModal = () => {
        this.setState({
            ...this.state,
            declineModal: false
        })
    };

    onClickDecline = (bookingId, note) => {
        const data = {
            note
        };
        this.props.declineBooking(bookingId, data);
    };

    getCostPlaygroundForPayBooking = () => {
        const { playgroundSchedule } = this.props;
        let costPlaygroundInRange = [];
        
        if (playgroundSchedule.length > 0) {
            playgroundSchedule.forEach(schedulePlaygroundItem => {
                // TODO: проверить как будет работать дата в ios устройствах.
                const timeRangeCost = moment.range(
                    schedulePlaygroundItem.start_time, 
                    schedulePlaygroundItem.end_time
                );
                costPlaygroundInRange.push({
                    time: timeRangeCost,
                    cost: schedulePlaygroundItem.price_per_hour
                });
            })
        }
    
        return costPlaygroundInRange;
    };

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
            note, // Note: заметка с причиной отмены бронирования
            bookingId,
            equipment_rent
        } = this.props;

        const pricePlayground = +calcCostService(
            startTime, 
            endTime, 
            this.getCostPlaygroundForPayBooking(),
            'YYYY-MM-DD HH:mm:ss ZZ'
        );

        const typeBookable = bookableFirstName ? 'Тренер' : 'Площадка';

        const howStatus = (_status) => {
            switch(_status) {
                case 0:
                    return 'Ваша заявка ещё не обработана тренером или администратором';
                
                case 1:
                    return 'Бронирование подтверждено';
                
                case 2:
                    return 'Бронирование отменено';
                
                default:
                    return 'Ошибка статуса заявки, позвоните тренеру или администратору лично';
            }
        };

        const styleBookingCard = cn('b-my-booking-card', {
            'wait': status === 0,
            'accept': status === 1,
            'cancel': status === 2,
            'error': status === undefined || status < 0 || status > 2
        });

        return(
            <div className={styleBookingCard}>
                <div className="b-my-booking-card__status">
                    <p className="b-my-booking-card__title">Статус</p>
                    <div className="b-my-booking-card__status-text">{howStatus(status)}</div>
                    { status === 2 &&
                        <div className="b-my-booking-card__status-text">Причина: {note}</div>
                    }
                </div>

                <div className="b-my-booking-card__type">
                    <p className="b-my-booking-card__title">Забронировано</p>
                    { typeBookable }
                    { bookableFirstName && ` ${bookableFirstName} ${bookableLastName} ` }
                </div>

                <div className="b-my-booking-card__time">
                    <p className="b-my-booking-card__title">Дата и время</p>
                    {moment(startTime, ANALIZE_DATE_TIME_ZONE).format('DD.MM.YYYY')} ({moment(startTime, ANALIZE_DATE_TIME_ZONE).format('dddd')})
                    <br/>
                    {moment(startTime, ANALIZE_DATE_TIME_ZONE).format('HH:mm')} - {moment(endTime, ANALIZE_DATE_TIME_ZONE).format("HH:mm")}
                </div>

                <div className="b-my-booking-card__playground">
                    <p className="b-my-booking-card__title">Корт</p>
                    <div className="b-my-booking-card__playground-name">
                        {playgroundName || playgroundAddress ?
                            `${playgroundName} (${playgroundAddress})`
                            : 'Не выбран'
                        }    
                        </div>
                </div>

                {equipment_rent && equipment_rent.length > 0 
                    ? <div className="info-block">
                        <p className="info-block__title">Дополнительные услуги</p>
                        <EquipmentsRent 
                            equipmentRent={equipment_rent}
                            startTimeRent={startTime}
                            endTimeRent={endTime}
                        />
                    </div>
                    : null
                }

                <div className="info-block info-block--accent">
                    <p className="info-block__title">Оплата тренера</p>
                    <div className="info-block__text">
                        <MoneyFromat 
                            cost={convertTypeMoney(price, 'RUB', 'banknote')}
                        />
                    </div>
                </div>

                <div className="info-block info-block--accent">
                    <p className="info-block__title">Оплата корта</p>
                    <div className="info-block__text">
                        {pricePlayground > 0 
                            ? <MoneyFromat 
                                cost={pricePlayground}
                            /> 
                            : 'Не указана администратором. Уточняйте у тренера или у администратора корта.'
                        }
                    </div>
                </div>

                { status !== 2 &&
                    <Fragment>
                        <DeclineBookingModal
                            isOpenModal={this.state.declineModal}
                            closeModal={this.closeDeclineModal}
                            onClickDecline={(note) => { this.onClickDecline(bookingId, note) }}
                            nameButton="Отменить бронь"
                        />
                        <div className="b-my-booking-card__button-wrap">
                            <button type="button" onClick={this.openDeclineModal} className="b-button">Отказаться</button>
                        </div>
                    </Fragment>
                }
            </div>
        )
    }
}

export default MyBookingCard;
