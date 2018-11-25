import React, { Component } from 'react';

class ProfileTab extends Component {
    onClick = () => {
        const { label, onClick } = this.props;
        // Note: функция callback которая опопвещает какой таб открывать основываясь на данных, полученных после клика
        onClick(label);
    }

    render() {
        const { label } = this.props;

        return(
            <li className="b-profile-tab" onClick={this.onClick}>
                {label}
            </li>
        )
    }
}

export default ProfileTab;
