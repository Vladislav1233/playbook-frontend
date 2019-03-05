import React, { Component } from 'react';
import { connect } from "react-redux";
import { getTrainerSchedule } from '../../store/actions/schedule';
import { dataTime } from '../../helpers/dataTime';
import { declineConfirmBooking } from '../../store/actions/schedule';

// Note: component
import Schedule from '../../components/Schedule';
import Preloader from '../../components/Preloader/Preloader';

// Note: style
import '../../style/bem-blocks/b-trainer-schedule-profile/index.scss';

class TrainerScheduleProfile extends Component {

    componentDidMount() {
        const { getTrainerSchedule } = this.props;

        // Note: собираем данные для get запроса расписания при инициализации страницы. Берём текущий день
        const data = dataTime();
        const { userId } = this.props;
        getTrainerSchedule(userId, data, true);
    }

    onClickDecline = (bookingId, note) => {
        const data = { note };
        const { userId, scheduleTrainer } = this.props;
        const dataForGetSchedule = dataTime({
            valueStart: scheduleTrainer.date,
            valueEnd: scheduleTrainer.date
        });

        this.props.declineBooking(bookingId, data, userId, dataForGetSchedule);
    }

    render() {
        const { 
            scheduleTrainer, 
            getTrainerSchedule, 
            bookedTime, 
            playgroundsForTraining,
            bookingPreloader
        } = this.props;
        
        // Note: userId - это uuid пользователя (тренера) расписание которого надо получить, в нашем случае мы находимся в личном кабинете и запрашиваем свой uuid тренера
        const { userId } = this.props;

        return(
            <div className="b-trainer-schedule-profile">
                <Schedule 
                    schedule={scheduleTrainer}
                    template={'trainer'}
                    getTrainerSchedule={getTrainerSchedule}
                    userId={userId}
                    bookedTime={bookedTime}
                    cost={scheduleTrainer.cost}
                    playgroundsForTraining={playgroundsForTraining}
                    isWhoBooked={true}
                    onClickDecline={this.onClickDecline}
                    preloader={bookingPreloader}
                    titlePage={"Моё расписание"}
                />

                { this.props.preloader ? <Preloader /> : null }
            </div>
        )
    }
}

const mapStateToProps = ({ scheduleTrainer, identificate, booking }) => {
    return {
        scheduleTrainer: scheduleTrainer.scheduleTrainer,
        bookedTime: scheduleTrainer.bookedTime,
        preloader: scheduleTrainer.preloader,
        playgroundsForTraining: scheduleTrainer.playgroundsForTraining,
        userId: identificate.userId,
        bookingPreloader: booking.preloader
    }
}
  
const mapStateToDispatch = (dispatch) => {
    return {
        /*
        * getTrainerSchedule - Запрос на получение расписания тренера
        * userId - uuid пользователя (тренера) расписание которого запрашиваем
        * data - принимает объект с ключами start_time и end_time - период на который прийдет расписание.
        * isCabinet - если true, то присылаем данные забронированного времени тренера со всей конфиденциальной информацией, которую модет знать и читать только тренер.
        */
        getTrainerSchedule: (userId, data, isCabinet) => dispatch(getTrainerSchedule(userId, data, isCabinet)),
        /*
        * Отменить бронирование
        * bookingId - uuid объекта бронирования
        * data: {
        *   note: 'Сообщение пользователю'
        *}
        * userId, dataForGetSchedule - для запроса получения расписания, который отправляется после отмены букинга
        */
       declineBooking: (bookingId, data, userId, dataForGetSchedule) => dispatch(declineConfirmBooking(bookingId, data, userId, dataForGetSchedule))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(TrainerScheduleProfile);