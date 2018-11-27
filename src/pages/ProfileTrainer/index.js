import React, { Component } from 'react';

// Note: Components
import ProfileTabs from '../../components/ProfileTabs';

// Note: images
// import addInfoIcon from '../../style/images/icon/add-info.svg';
import addScheduleIcon from '../../style/images/icon/add-schedule.svg';
// import invitationReserveIcon from '../../style/images/icon/invitation-reserve.svg';
import myScheduleIcon from '../../style/images/icon/my-schedule.svg';

class ProfileTrainer extends Component {
    render() {
        return (
            <div className="container">
                <ProfileTabs>
                    <div label="Добавить расписание" src={addScheduleIcon}>
                        Добавить расписание
                    </div>
                    
                    <div label="Моё расписание" src={myScheduleIcon}>
                        Моё расписание
                    </div>
                </ProfileTabs>
            </div>
        )
    }
}

export default ProfileTrainer;
