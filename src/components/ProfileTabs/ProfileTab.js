import React, { Component } from 'react';
import cn from 'classnames';

// style
import '../../style/bem-blocks/b-profile-tab/index.scss';

class ProfileTab extends Component {
    onClick = () => {
        const { label, onClick } = this.props;
        // Note: функция callback которая опопвещает какой таб открывать основываясь на данных, полученных после клика
        onClick(label);
    }

    render() {
        const { src, label, isActive } = this.props;

        const className = cn('b-profile-tab', {
            active: isActive
        })

        return(
            <li className={className} onClick={this.onClick} title="TODO_AMED: title">
                {src ? <img className="b-profile-tab__icon" src={src} alt={label} /> : null}
                {label ? <p className="b-profile-tab__text">{label}</p> : null}
            </li>
        )
    }
}

export default ProfileTab;
