import React, { Component } from 'react';

class ProfileTabContent extends Component {
    render() {
        return (
            <div className="b-profile-tabs__content">
                {this.props.children}
            </div>
        )
    }
}

export default ProfileTabContent;
