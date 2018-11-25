import React, { Component, Fragment } from 'react';

// Note: Components
import ProfileTabs from '../../components/ProfileTabs';

class ProfileTrainer extends Component {
    render() {
        return (
            <Fragment>
                <ProfileTabs>
                    <div label="Первый типуля">
                        Я первый типуля
                    </div>
                    
                    <div label="Второй типуля">
                        Я второй типуля
                    </div>
                </ProfileTabs>
            </Fragment>
        )
    }
}

export default ProfileTrainer;
