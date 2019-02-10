import React, { Component, Fragment } from 'react';
import moment from 'moment';
import cn from 'classnames';

// Note: components
import BookingModal from '../Modal/BookingModal';

// style
import '../../style/bem-blocks/b-schedule-item/index.scss';

class ScheduleItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    openModal = () => {
        this.setState({ showModal: true });
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }
  
    render() {
        const { 
            start_time, 
            end_time,
            isStatus // true - это время свободно, false - это время занято
        } = this.props.dataScheduleItem;
    
        const { template, playgroundsForTraining, userId, creator, isWhoBooked } = this.props;
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
        const classNameState = cn('b-schedule-item__state', {
            'b-schedule-item__state--free': isStatus,
            'b-schedule-item__state--busy': !isStatus
        });
        const classNameStateName = cn('b-schedule-item__state-name', {
            'b-schedule-item__state-name--block': template === 'court'
        });

        const itemTrainer = () => (
            isStatus ? 
                <Fragment>
                    {/* <div className='b-schedule-item__court-info'>
                        <p className='b-schedule-item__name-court'>{courts[0].name}</p>
                        <p className='b-schedule-item__address-court'>{courts[0].street}, д. {courts[0].number}</p>
                        {courts.length > 1 ?
                            <p className="b-schedule-item__additional-court">или ещё {courts.length - 1} корт(а)</p>
                            :
                            null
                        }
                    </div> */}
                    <div className="b-schedule-item__click">{ textBooking }</div>
                </Fragment>
                :
                null
        );

        const itemCourt = () => (
            isStatus ? 
                <div className="b-schedule-item__click">{ textBooking }</div>
            : null
        );

        return (
            <Fragment>
                <div className="b-schedule-item" onClick={() => {if(isStatus) { this.openModal(); } }}>
                    <div className="b-schedule-item__time-wrap">
                        <div className="b-schedule-item__time">{moment(start_time).format('HH:mm')}</div>
                        <div className="b-schedule-item__time b-schedule-item__time--finish">{moment(end_time).format('HH:mm')}</div>
                    </div>

                    <div className="b-schedule-item__info">
                        <div className={classNameState}>
                            <span className={classNameStateName}>{isStatus ? 'Свободно ' : 'Занято '} </span>
                        </div>

                        {creator && isWhoBooked 
                            ? whoBookedTemplate(
                                `${creator.first_name} ${creator.last_name}`,
                                creator.phone
                            ) 
                            : null
                        }

                        { 
                            template === 'trainer' ?
                                itemTrainer()
                            :
                            template === 'court' ?
                                itemCourt()
                            : null
                        }
                    </div>
                    
                    {/* TODO: Добавить тултип */}
                    {!isStatus && isWhoBooked 
                        ? <button className="b-close b-close--schedule-item"></button> 
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
                    />
                }
            </Fragment>
        )
  }
}

export default ScheduleItem;
