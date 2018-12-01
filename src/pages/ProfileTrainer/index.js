import React, { Component } from 'react';
import { connect } from "react-redux";

// Note: Components
import ProfileTabs from '../../components/ProfileTabs';
import TrainerAddSchedule from './TrainerAddSchedule';

// Note: images
// import addInfoIcon from '../../style/images/icon/add-info.svg';
import addScheduleIcon from '../../style/images/icon/add-schedule.svg';
// import invitationReserveIcon from '../../style/images/icon/invitation-reserve.svg';
import myScheduleIcon from '../../style/images/icon/my-schedule.svg';

class ProfileTrainer extends Component {

    render() {
        const { toggleCabinet } = this.props;

        return (
            <div className="container">
                <ProfileTabs isOpen={toggleCabinet}>
                    <div label="Добавить расписание" src={addScheduleIcon}>
                        <TrainerAddSchedule />
                    </div>
                    
                    <div label="Моё расписание" src={myScheduleIcon}>
                        Моё расписание
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

export default connect(mapStateToProps)(ProfileTrainer);
