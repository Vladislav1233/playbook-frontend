import React, { Component, Fragment } from 'react';
import moment from 'moment';
import cn from 'classnames';
import NumberFormat from 'react-number-format';

// Note: helpers
import { convertTypeMoney } from '../../helpers/convertTypeMoney';

// Note: components
import BookingModal from '../Modal/BookingModal';
import DeclineBookingModal from '../Modal/DeclineBookingModal';

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
  
    render() {
        const { 
            start_time, 
            end_time,
            isStatus // true - это время свободно, false - это время занято
        } = this.props.dataScheduleItem;

        const bookingId = this.props.dataScheduleItem.uuid;
        const analizeDateTimeZone = 'YYYY-MM-DD HH:mm:ss ZZ';
    
        const { 
            playgroundsForTraining, 
            userId, 
            creator, 
            isWhoBooked, 
            onClickDecline, 
            cost,
            bookedCost
        } = this.props;

        const textBooking = 'Нажми, чтобы забронировать';

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
                <div className={classNameStateRoot} onClick={() => {if(isStatus) { this.openModal(); } }}>
                    <div>
                        <div className="b-schedule-item__time-wrap">
                            <div className="b-schedule-item__time">
                                {moment(start_time, analizeDateTimeZone).format('HH:mm')}
                            </div>
                            &nbsp;—&nbsp;
                            <div className="b-schedule-item__time b-schedule-item__time--finish">
                                {moment(end_time, analizeDateTimeZone).format('HH:mm')}
                            </div>
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
                        

                        {bookedCost && isWhoBooked
                            ? <div className="info-block info-block--accent info-block--compact">
                                <p className="info-block__title">К оплате:</p>
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
                </div>
                        
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
                    />
                }
            </Fragment>
        )
  }
}

export default ScheduleItem;
