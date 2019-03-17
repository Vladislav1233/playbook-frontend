import React, { lazy, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


// Note: components. routesAllUser.
const TestRequest = lazy(() => import('../pages/TestRequest/TestRequest'));
const HelloPage = lazy(() => import('../pages/HelloPage/HelloPage'));
const Auth = lazy(() => import('../pages/Auth'));
const Registration = lazy(() => import('../pages/Registration/Registration'));
const ListCourt = lazy(() => import('../pages/ListCourt'));
const ListTrainer = lazy(() => import('../pages/ListTrainer'));
const ScheduleTrainer = lazy(() => import('../pages/ScheduleTrainer/ScheduleTrainer'));
const MyBooking = lazy(() => import('../pages/MyBooking'));
const StyleGuide = lazy(() => import('../pages/StyleGuide'));
// const NotFound = lazy(() => import('../pages/NotFound'));

// Note: components. routesTrainer.
const Profile = lazy(() => import('../pages/Profile'));
const TrainerAddSchedule = lazy(() => import('../pages/Profile/Trainer/TrainerAddSchedule'));
const TrainerScheduleProfile = lazy(() => import('../pages/Profile/Trainer/TrainerScheduleProfile'));
const TrainerBookingRequest = lazy(() => import('../pages/Profile/Trainer/TrainerBookingRequest'));
const TrainerInfo = lazy(() => import('../pages/Profile/Trainer/TrainerInfo'));


// Note: Компонеты для всех типов пользователей, включая незарегистрированного пользователя.
export const routesAllUser = [{
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
}];

// Note: Компоненты для тренера + стандартные компоненты.
export const routesTrainer = [
    ...routesAllUser, {
    
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
};

export function AppUserTemplate(props) {
    return (
        <Switch>
            {routesAllUser.map((route, i) => {
                return <RouteWithSubRoutes key={i} {...route} />
            })}

            {props.isAuthorization ? 
                <Fragment>
                    <Redirect from='/authorization' to='/'/>
                    <Redirect from='/registration' to='/'/>
                </Fragment>
            : null}
            {/* <Redirect from='/profile' to='/profile/create-schedule'/> */}
        </Switch>
    );
};

export function AppTrainerTemplate(props) {
    return (
        <Switch>
            {routesTrainer.map((route, i) => {
                return <RouteWithSubRoutes key={i} {...route} />
            })}
            {props.isAuthorization ? 
                <Fragment>
                    <Redirect from='/authorization' to='/'/>
                    <Redirect from='/registration' to='/'/>
                    {/* <Redirect from='/profile' to='/profile/create-schedule'/> */}
                </Fragment>
            : null}
        </Switch>
    );
};