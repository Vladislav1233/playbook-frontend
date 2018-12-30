import React, { Component, Fragment } from 'react';
import moment from 'moment';

// style
import '../../style/bem-blocks/b-schedule-item/index.scss';

class ScheduleItem extends Component {
  
  render() {
    const { 
        start_time, 
        end_time,
        status // true - это время свободно, false - это время занято
    } = this.props.dataScheduleItem;
    
    const { template } = this.props;
    const textBooking = 'Нажми, чтобы забронировать';

    const itemTrainer = () => (
        status ? 
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
        status ? 
            <div className="b-schedule-item__click">{ textBooking }</div>
        : null
    );

    return (
        <div className="b-schedule-item">
            <div className="b-schedule-item__time-wrap">
                <div className="b-schedule-item__time">{moment(start_time).format('HH:mm')}</div>
                <div className="b-schedule-item__time b-schedule-item__time--finish">{moment(end_time).format('HH:mm')}</div>
            </div>

            <div className="b-schedule-item__info">
                <div className={`b-schedule-item__state ${status ? 'b-schedule-item__state--free' : 'b-schedule-item__state--busy'}`}>
                    <span className={`b-schedule-item__state-name ${template === 'court' ? 'b-schedule-item__state-name--block' : ''}`}>{status ? 'Свободно ' : 'Занято '} </span>
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
    )
  }
}

export default ScheduleItem;
