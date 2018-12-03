import React, { Component } from 'react';
import { connect } from "react-redux";
import { toggleCabinet } from '../../store/actions/toggleCabinet';

// Note: Components
import ProfileTabs from '../../components/ProfileTabs';
import TrainerAddSchedule from './TrainerAddSchedule';

// Note: images
import addInfoIcon from '../../style/images/icon/add-info.svg';
import addScheduleIcon from '../../style/images/icon/add-schedule.svg';
import invitationReserveIcon from '../../style/images/icon/invitation-reserve.svg';
import myScheduleIcon from '../../style/images/icon/my-schedule.svg';

class ProfileTrainer extends Component {

    render() {
        const { toggleCabinet, onToggleCabinet } = this.props;

        return (
            <div className="container">
                <ProfileTabs isOpen={toggleCabinet} onToggleCabinet={onToggleCabinet}>
                    <div label="Добавить расписание" src={addScheduleIcon}>
                        <TrainerAddSchedule />
                    </div>
                    
                    <div label="Моё расписание" src={myScheduleIcon}>
                        Моё расписание
                    </div>

                    <div label="Заявки на бронь" src={invitationReserveIcon}>
                        Заявки на бронь
                    </div>

                    <div label="Информация о себе" src={addInfoIcon}>
                        Информация о себе
                    </div>
                </ProfileTabs>
            </div>
        )
    }
}

const mapStateToProps = ({ toggleCabinet }) => {
    return {
        toggleCabinet: toggleCabinet.toggleCabinet
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleCabinet: (e) => {
            e.preventDefault();
            dispatch(toggleCabinet());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTrainer);
