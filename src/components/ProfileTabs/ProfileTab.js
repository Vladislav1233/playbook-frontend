import React, { Component } from 'react';

// style
import '../../style/bem-blocks/b-profile-tab/index.scss';

class ProfileTab extends Component {
    onClick = () => {
        const { label, onClick } = this.props;
        // Note: функция callback которая опопвещает какой таб открывать основываясь на данных, полученных после клика
        onClick(label);
    }

    render() {
        const { src } = this.props;

        return(
            <li className="b-profile-tab" onClick={this.onClick}>
                {src ? <img src={src} alt="Добавить расписание" /> : null}
            </li>
        )
    }
}

export default ProfileTab;
