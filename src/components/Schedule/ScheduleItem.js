import React, { Component, Fragment } from 'react';
import moment from 'moment';
import cn from 'classnames';
import NumberFormat from 'react-number-format';

// Note: helpers
import { convertTypeMoney } from '../../helpers/convertTypeMoney';
import calcCostService from '../../helpers/calcCostService';
import { Tablet } from '../../helpers/mediaQuery';

// Note: components
import BookingModal from '../Modal/BookingModal';
import DeclineBookingModal from '../Modal/DeclineBookingModal';
import EquipmentsRent from '../EquipmentsRent';

// style
import '../../style/bem-blocks/b-schedule-item/index.scss';
import deleteIcon from '../../style/images/icon/delete.svg';

class ScheduleItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            declineModal: false
        }
    }

    openModal = () => {
        this.setState({
            ...this.state,
            showModal: true
        });
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            showModal: false
        });
    }

    openDeclineModal = () => {
        this.setState({
            ...this.state,
            declineModal: true
        })
    }

    closeDeclineModal = () => {
        this.setState({
            ...this.state,
            declineModal: false
        })
    }

    getCostPlaygroundForPayBooking = () => {
        const { playground } = this.props.dataScheduleItem;
        const playgroundSchedule = playground.schedules;
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
            playgroundsForTraining,
            userId,
            creator,
            isWhoBooked,
            onClickDecline,
            cost,
            bookedCost,
            additionalService
        } = this.props;

        const {
            start_time,
            end_time,
            isStatus, // true - это время свободно, false - это время занято
            playground,
            equipment_rent
        } = this.props.dataScheduleItem;

        const bookingId = this.props.dataScheduleItem.uuid;

        const analizeDateTimeZone = 'YYYY-MM-DD HH:mm:ss ZZ';

        const textBooking = 'Нажми, чтобы забронировать';

        let costPlayground = playground
            ? +calcCostService(
                moment(start_time).format('YYYY-MM-DD HH:mm:ss'),
                moment(end_time).format('YYYY-MM-DD HH:mm:ss'),
                this.getCostPlaygroundForPayBooking()
            ) : 0;

        // Note: Классы css
        const classNameStateRoot = cn(
            'b-schedule-item',
            {
                'b-schedule-item--free': isStatus,
                'b-schedule-item--busy': !isStatus
            }
        );

        return (
            <Fragment>
                <button type="button" className={classNameStateRoot} tabIndex={ isStatus?0:null } onClick={() => {if(isStatus) { this.openModal(); } }}>
                    <div>
                        <div className="b-schedule-item__time-wrap">
                            <div className="b-schedule-item__time">
                                {moment(start_time, analizeDateTimeZone).format('HH:mm')}
                            </div>
                            &nbsp;—&nbsp;
                            <div className="b-schedule-item__time b-schedule-item__time--finish">
                                {moment(end_time, analizeDateTimeZone).format('HH:mm')}
                            </div>

                            <Tablet>
                                <span className="b-schedule-item__duration">
                                    [ { moment(end_time, analizeDateTimeZone).diff(moment(start_time, analizeDateTimeZone), "minutes") } мин ]
                                </span>
                            </Tablet>

                        </div>

                        {/* Имя */}
                        {creator && isWhoBooked &&
                            <div className="info-block info-block--compact">
                                <p className="info-block__title">Имя:</p>
                                <p className="info-block__text">{ `${creator.first_name} ${creator.last_name}` }</p>
                            </div>
                        }

                        {/* Телефон */}
                        {creator && isWhoBooked &&
                            <div className="info-block info-block--compact">
                                <p className="info-block__title">Телефон:</p>
                                <p className="info-block__text">
                                    <a href={`tel:+${creator.phone}`} className="b-schedule-item__who-tel">{`+${creator.phone}`}</a>
                                </p>
                            </div>
                        }

                        {!isStatus && isWhoBooked &&
                            <div className="info-block info-block--compact">
                                <p className="info-block__title">Площадка:</p>
                                <p className="info-block__text">
                                    {playground ? playground.name : 'Другое'}
                                </p>
                            </div>
                        }


                        {bookedCost && isWhoBooked
                            ? <div className="info-block info-block--accent info-block--compact">
                                <p className="info-block__title">К оплате тренеру:</p>
                                <p className="info-block__text">
                                    {<NumberFormat
                                        value={convertTypeMoney(bookedCost, 'RUB', 'banknote')}
                                        suffix=' ₽'
                                        thousandSeparator={' '}
                                        displayType='text'
                                        decimalScale={0}
                                    />}
                                </p>
                            </div>
                            :null
                        }

                        {playground &&
                            <div className="info-block info-block--accent info-block--compact">
                                <p className="info-block__title">К оплате за корт:</p>
                                <p className="info-block__text">
                                    {costPlayground > 0
                                        ? <NumberFormat
                                            value={costPlayground}
                                            suffix=' ₽'
                                            thousandSeparator={' '}
                                            displayType='text'
                                            decimalScale={0}
                                        />
                                        : 'Не указана администратором.'
                                    }
                                </p>
                            </div>
                        }

                        {equipment_rent
                            ? <div className="info-block info-block--compact">
                                <p className="info-block__title">Доп. услуги:</p>
                                <p className="info-block__text">
                                    <EquipmentsRent
                                        equipmentRent={equipment_rent}
                                        startTimeRent={start_time}
                                        endTimeRent={end_time}
                                    />
                                </p>
                            </div>
                            : null
                        }
                    </div>

                    { !!isStatus &&
                        <div className="b-schedule-item__click">{textBooking}</div>
                    }

                    {/* TODO: Добавить тултип */}
                    {!isStatus && isWhoBooked
                        ? ( <Fragment>
                                <button type="button" onClick={this.openDeclineModal} title="Отменить" className="b-schedule-item__cancel">
                                    <img className="b-add-schedule-card__delete-icon" src={deleteIcon} alt="Корзина" />
                                </button>

                                <DeclineBookingModal
                                    isOpenModal={this.state.declineModal}
                                    closeModal={this.closeDeclineModal}
                                    onClickDecline={(note) => onClickDecline(bookingId, note)}
                                    nameButton="Отменить бронь"
                                />
                            </Fragment>
                        )
                        : null
                    }
                </button>

                {isStatus &&
                    <BookingModal
                        isOpenModal={this.state.showModal}
                        closeModal={this.closeModal}
                        typeBooking='trainer'
                        dateBooking={moment(start_time, analizeDateTimeZone).format('YYYY-MM-DD')}
                        playgroundsForTraining={playgroundsForTraining}
                        userId={userId}
                        cost={cost}
                        startTime={start_time}
                        endTime={end_time}
                        additionalService={additionalService}
                    />
                }
            </Fragment>
        )
  }
}

export default ScheduleItem;
