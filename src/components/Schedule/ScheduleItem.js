import React, { Component, Fragment } from 'react';
import moment from 'moment';
import cn from 'classnames';

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
    
        const { playgroundsForTraining, userId, creator, isWhoBooked, onClickDecline, cost } = this.props;
        const textBooking = 'Нажми, чтобы забронировать';

        const whoBookedTemplate = (whoName, whoTel) => {
            return (
                <div className="b-schedule-item__who-booked">
                    <p className="b-schedule-item__who-name">{whoName}</p>
                    <a href={`tel:+${whoTel}`} className="b-schedule-item__who-tel">{`+${whoTel}`}</a>
                </div>
            )
        };

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
                                {moment(start_time).format('HH:mm')}
                            </div>
                            &nbsp;—&nbsp;
                            <div className="b-schedule-item__time b-schedule-item__time--finish">
                                {moment(end_time).format('HH:mm')}
                            </div>
                        </div>

                        {creator && isWhoBooked
                            ? whoBookedTemplate(
                                `${creator.first_name} ${creator.last_name}`,
                                creator.phone
                            )
                            : null
                        }
                    </div>
                    
                    { !!isStatus &&
                        <div className="b-schedule-item__click">{textBooking}</div>
                    }
                    
                    {/* TODO: Добавить тултип */}
                    {!isStatus && isWhoBooked 
                        ? ( <Fragment>
                                <button type="button" onClick={this.openDeclineModal} tytle="Отменить" className="b-schedule-item__cancel">
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
                        dateBooking={moment(start_time).format('YYYY-MM-DD')}
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
