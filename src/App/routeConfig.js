import React from 'react';
import { Switch, Route } from 'react-router-dom';


// Note: components. routesAllUser.
// const TestRequest = lazy(() => import('../pages/TestRequest/TestRequest'));
// const HelloPage = lazy(() => import('../pages/HelloPage/HelloPage'));
// const Auth = lazy(() => import('../pages/Auth'));
// const Registration = lazy(() => import('../pages/Registration/Registration'));
// const ListCourt = lazy(() => import('../pages/ListCourt'));
// const ListTrainer = lazy(() => import('../pages/ListTrainer'));
// const ScheduleTrainer = lazy(() => import('../pages/ScheduleTrainer/ScheduleTrainer'));
// const MyBooking = lazy(() => import('../pages/MyBooking'));
// const StyleGuide = lazy(() => import('../pages/StyleGuide'));
// const NotFound = lazy(() => import('../pages/NotFound'));

// // Note: components. routesTrainer.
// const Profile = lazy(() => import('../pages/Profile'));
// const TrainerAddSchedule = lazy(() => import('../pages/Profile/Trainer/TrainerAddSchedule'));
// const TrainerScheduleProfile = lazy(() => import('../pages/Profile/Trainer/TrainerScheduleProfile'));
// const TrainerBookingRequest = lazy(() => import('../pages/Profile/Trainer/TrainerBookingRequest'));
// const TrainerInfo = lazy(() => import('../pages/Profile/Trainer/TrainerInfo'));


// Note: components. routesAllUser.
import TestRequest from '../pages/TestRequest/TestRequest';
import HelloPage from '../pages/HelloPage/HelloPage';
import Auth from '../pages/Auth';
import Registration from '../pages/Registration/Registration';
import ListCourt from '../pages/ListCourt';
import ListTrainer from '../pages/ListTrainer';
import ScheduleTrainer from '../pages/ScheduleTrainer/ScheduleTrainer';
import MyBooking from '../pages/MyBooking';
import StyleGuide from '../pages/StyleGuide';
import UserAgreement from '../pages/UserAgreement';
import NotFound from '../pages/NotFound';

// Note: components. routesTrainer.
import Profile from '../pages/Profile';
import TrainerAddSchedule from '../pages/Profile/Trainer/TrainerAddSchedule';
import TrainerScheduleProfile from '../pages/Profile/Trainer/TrainerScheduleProfile';
import TrainerBookingRequest from '../pages/Profile/Trainer/TrainerBookingRequest';
import TrainerInfo from '../pages/Profile/Trainer/TrainerInfo';

// Note: Компонеты для всех типов пользователей, включая незарегистрированного пользователя.
const defaultRoutes = [{
    path: '/',
    name: 'HelloPage',
    component: HelloPage,
    exact: true
}, {
    path: '/authorization',
    name: 'Auth',
    component: Auth
}, {
    path: '/registration',
    name: 'Registration',
    component: Registration
}, {
    path: '/test-request',
    name: 'TestRequest',
    component: TestRequest
}, {
    path: '/list-court',
    name: 'ListCourt',
    component: ListCourt
}, {
    path: '/list-trainer',
    name: 'ListTrainer',
    component: ListTrainer
}, {
    path: '/schedule-trainer/:slug',
    name: 'ScheduleTrainer',
    component: ScheduleTrainer
}, {
    path: '/my-booking',
    name: 'MyBooking',
    component: MyBooking
}, {
    path: '/style-guide',
    name: 'StyleGuide',
    component: StyleGuide
}, {
    path: '/agreement',
    name: 'UserAgreement',
    component: UserAgreement
}];

export const routesAllUser = [
    ...defaultRoutes
];

// Note: Компоненты для тренера + стандартные компоненты.
export const routesTrainer = [
    ...defaultRoutes, {
    
    path: '/profile',
    name: 'Profile',
    component: Profile,
    
    routes: [{
        path: '/profile/create-schedule',
        name: 'TrainerAddSchedule',
        component: TrainerAddSchedule
    }, {
        path: '/profile/my-schedule',
        name: 'TrainerScheduleProfile',
        component: TrainerScheduleProfile
    }, {
        path: '/profile/booking-request',
        name: 'TrainerBookingRequest',
        component: TrainerBookingRequest
    }, {
        path: '/profile/trainer-info',
        name: 'TrainerInfo',
        component: TrainerInfo
    }]
}];

// Note: Сама функция рендера компонента по переданному ей сопоставлению маршрута (роута).
export function RouteWithSubRoutes(route) {
    return(
        <Route
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={props => {
                return <route.component {...props} routes={route.routes} />
            }}
        />
    )
}

export function AppUserTemplate() {
    return (
        <Switch>
            {routesAllUser.map((route, i) => {
                return <RouteWithSubRoutes key={i} {...route} />
            })}
            <Route render={() => NotFound} />
        </Switch>
    );
}

export function AppTrainerTemplate() {
    return (
        <Switch>
            {routesTrainer.map((route, i) => {
                return <RouteWithSubRoutes key={i} {...route} />
            })}
            <Route render={() => NotFound} />
        </Switch>
    );
}
