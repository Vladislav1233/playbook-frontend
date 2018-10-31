import React, { Component, Fragment } from 'react';

// style
import '../../style/bem-blocks/b-schedule-item/index.scss';

class ScheduleItem extends Component {
  
  render() {
    // const {startTime, finishTime, court, price, status} = this.props.dataScheduleItem;

    return (
        // TODO: Убрать фрагмент когда выведем через map
        // TODO: li вы нести в компонент schedule list
        <Fragment>
            {/* Свободное время тренера, у которого один или несколько кортов */}
            <li className="b-schedule-list__item">
                <div className="b-schedule-item">
                    <div className="b-schedule-item__time-wrap">
                        <div className="b-schedule-item__time">12:00</div>
                        <div className="b-schedule-item__time b-schedule-item__time--finish">17:00</div>
                    </div>
                    <div className="b-schedule-item__info">
                        <div className='b-schedule-item__state b-schedule-item__state--free'>Свободно <span className="b-schedule-item__price">700 р/час</span></div>
                        <div className='b-schedule-item__court-info'>
                            <span className='b-schedule-item__name-court'>Lawn tennis</span>
                            <span className='b-schedule-item__address-court'>ул. Первомайская, д. 59</span>
                            <span className="b-schedule-item__additional-court">или ещё 2 корт(а)</span>
                        </div>
                        <div className="b-schedule-item__court-info b-schedule-item__court-info--click">Кликни на блок для брони</div>
                    </div>
                </div>
            </li>

            {/* Свободное время тренера, но кортов нет */}
            <li className="b-schedule-list__item">
                <div className="b-schedule-item">
                    <div className="b-schedule-item__time-wrap">
                        <div className="b-schedule-item__time">12:00</div>
                        <div className="b-schedule-item__time b-schedule-item__time--finish">17:00</div>
                    </div>
                    <div className="b-schedule-item__info">
                        <div className='b-schedule-item__state b-schedule-item__state--free'>Свободно <span className="b-schedule-item__price">700 р/час</span></div>
                        <div className="b-schedule-item__court-info">Нет свободных кортов на это время. Теория или знаешь где свободный корт? - наибрай <span className="b-schedule-item__tel">89178667345</span></div>
                    </div>
                </div>
            </li>
        </Fragment>
    )
  }
}

export default ScheduleItem;


// <div className="b-schedule-item">
//             <div className="b-schedule-item__time-wrap">
//                 <div className="b-schedule-item__time">{startTime}</div>
//                 <div className="b-schedule-item__time b-schedule-item__time--finish">{finishTime}</div>
//             </div>
//             <div className="b-schedule-item__info">
//                 <div className={`b-schedule-item__state ${status ? 'b-schedule-item__state--free': 'b-schedule-item__state--busy'}`}>{status ? 'Свободно' : 'Занято'} <span className="b-schedule-item__price">{price} р/час</span></div>
//                 <div className="b-schedule-item__court-info">Корт №{court}</div>
//                 <div className="b-schedule-item__court-info">Тип: искуственная трава</div>
//                 <div className="b-schedule-item__court-info b-schedule-item__court-info--click">Кликни на блок для брони</div>
//             </div>
//         </div>
