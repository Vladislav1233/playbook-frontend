import React, { Component, Fragment } from 'react';
import moment from 'moment';

// Note: components
import BookingModal from '../BookingModal';

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
    
        const { template, playgroundsForTraining, userId } = this.props;
        const textBooking = 'Нажми, чтобы забронировать';

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
                        <div className={`b-schedule-item__state ${isStatus ? 'b-schedule-item__state--free' : 'b-schedule-item__state--busy'}`}>
                            <span className={`b-schedule-item__state-name ${template === 'court' ? 'b-schedule-item__state-name--block' : ''}`}>{isStatus ? 'Свободно ' : 'Занято '} </span>
                        </div>
                        { 
                            template === 'trainer' ?
                                itemTrainer()
                            :
                            template === 'court' ?
                                itemCourt()
                            : null
                        }
                        
                    </div>
                </div>
 
                <BookingModal 
                    isOpenModal={this.state.showModal}
                    closeModal={this.closeModal}
                    typeBooking='trainer'
                    dateBooking={moment(start_time).format('YYYY-MM-DD')}
                    playgroundsForTraining={playgroundsForTraining}
                    userId={userId}
                />
            </Fragment>
        )
  }
}

export default ScheduleItem;
