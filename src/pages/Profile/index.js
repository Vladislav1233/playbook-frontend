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
    label: 'Добавить расписание'
}, {
    to: '/profile/my-schedule',
    image: myScheduleIcon,
    label: 'Моё расписание'
}, {
    to: '/profile/manage-playground-list',
    image: addScheduleIcon,
    label: 'Управление площадками'
}, {
    to: '/profile/booking-request',
    image: invitationReserveIcon,
    label: 'Входящие запросы'
}, {
    to: '/profile/trainer-info',
    image: addInfoIcon,
    label: 'Обо мне'
}];

class ProfileTrainer extends Component {

    render() {
        const { toggleCabinet, routes, location } = this.props;

        const classNameList = cn(
            'b-profile-tabs__list-wrapper',
            {
                open: toggleCabinet
            }
        );

        const howLocation = location.pathname.split('/');

        return (
            <div className="container container--cabinet">
                <div className="b-profile-tabs">
                    <nav className={classNameList}>
                        <div className="b-profile-tabs__list">
                            {navigationLink.map((item, index) => {
                                const classNameProfileTab = cn(
                                    'b-profile-tab',
                                    {
                                        'active': howLocation[2] === 'manage-playground' 
                                        && item.label === 'Управление площадками'
                                    }
                                );
                                return (
                                    <NavLink key={index} className={classNameProfileTab} to={item.to} title={item.label}>
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
