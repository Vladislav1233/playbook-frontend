import React, { Component } from 'react';
import { connect } from "react-redux";
import cn from 'classnames';

import { toggleCabinet } from '../../store/actions/toggleCabinet';
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import { RouteWithSubRoutes } from '../../App/routeConfig';

// Note: components
import NotFound from '../NotFound';

// Note: images
import addInfoIcon from '../../style/images/icon/add-info.svg';
import addScheduleIcon from '../../style/images/icon/add-schedule.svg';
import invitationReserveIcon from '../../style/images/icon/invitation-reserve.svg';
import myScheduleIcon from '../../style/images/icon/my-schedule.svg';

// Note: styles
import '../../style/bem-blocks/b-profile-tabs/index.scss';
import '../../style/bem-blocks/b-profile-tab/index.scss';

const navigationLink = [{
    to: '/profile/create-schedule',
    image: addScheduleIcon,
    label: 'Создать расписание'
}, {
    to: '/profile/my-schedule',
    image: myScheduleIcon,
    label: 'Моё расписание'
}, {
    to: '/profile/booking-request',
    image: invitationReserveIcon,
    label: 'Запросы на бронирование'
}, {
    to: '/profile/trainer-info',
    image: addInfoIcon,
    label: 'Информация'
}];

class ProfileTrainer extends Component {

    render() {
        const { toggleCabinet, onToggleCabinet, routes } = this.props;

        const classNameButton = cn(
            'b-profile-tabs__back',
            {
                open: toggleCabinet
            }
        );

        const classNameList = cn(
            'b-profile-tabs__list-wrapper',
            {
                open: toggleCabinet
            }
        );

        return (
            <div className="container container--cabinet">
                <div className="b-profile-tabs">
                    <div className={ classNameButton } onClick={(e) => onToggleCabinet(e)}>
                        <i className="fas fa-angle-right icon"></i>
                    </div>

                    <nav className={classNameList}>
                        {/* <div className="b-profile-tabs__header"></div> */}
                        <div className="b-profile-tabs__list">
                            {navigationLink.map((item, index) => {
                                return (
                                    <NavLink key={index} className="b-profile-tab" to={item.to} title={item.label}>
                                        <img className="b-profile-tab__icon" src={item.image} alt={item.label}/>
                                        <p className="b-profile-tab__text">{item.label}</p>
                                    </NavLink>
                                )
                            })}
                        </div>
                    </nav>

                    <div className="b-profile-tabs__content">
                        <Switch>
                            {routes.map((route, i) => {
                                return(
                                    <RouteWithSubRoutes key={i} {...route} />
                                )
                            })}
                            <Redirect from="/profile" to="/profile/create-schedule" />
                            <Route path="*" component={NotFound}/>
                        </Switch>
                    </div>
                </div>
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
            if(e) e.preventDefault();
            dispatch(toggleCabinet());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTrainer);
