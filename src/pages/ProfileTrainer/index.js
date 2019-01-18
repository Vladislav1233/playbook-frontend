import React, { Component } from 'react';
import { connect } from "react-redux";
import { toggleCabinet } from '../../store/actions/toggleCabinet';

// Note: Components
import ProfileTabs from '../../components/ProfileTabs';
import TrainerAddSchedule from './TrainerAddSchedule';
import TrainerScheduleProfile from './TrainerScheduleProfile';
import TrainerInfo from './TrainerInfo';
import TrainerBookingRequest from './TrainerBookingRequest';

// Note: images
import addInfoIcon from '../../style/images/icon/add-info.svg';
import addScheduleIcon from '../../style/images/icon/add-schedule.svg';
import invitationReserveIcon from '../../style/images/icon/invitation-reserve.svg';
import myScheduleIcon from '../../style/images/icon/my-schedule.svg';

class ProfileTrainer extends Component {

    render() {
        const { toggleCabinet, onToggleCabinet } = this.props;

        return (
            <ProfileTabs isOpen={toggleCabinet} onToggleCabinet={onToggleCabinet}>
                <div label="Добавить расписание" src={addScheduleIcon}>
                    <TrainerAddSchedule />
                </div>
                
                <div label="Моё расписание" src={myScheduleIcon}>
                    <TrainerScheduleProfile />
                </div>

                <div label="Заявки на бронь" src={invitationReserveIcon}>
                    <TrainerBookingRequest />
                </div>

                <div label="Информация о себе" src={addInfoIcon}>
                    <TrainerInfo />
                </div>
            </ProfileTabs>
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
