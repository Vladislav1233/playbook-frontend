import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { configPathRouter } from './configPathRouter';

// Note: component
// --- default ---
import ScheduleTrainer from '../pages/ScheduleTrainer/ScheduleTrainer';
// import ScheduleCourt from '../pages/ScheduleCourt/ScheduleCourt';
import HelloPage from '../pages/HelloPage/HelloPage';
import Registration from '../pages/Registration/Registration';
import TestRequest from '../pages/TestRequest/TestRequest';
import Auth from '../pages/Auth/Auth';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ListCourt from '../pages/ListCourt';
import ListTrainer from '../pages/ListTrainer';
import MyBooking from '../pages/MyBooking';
import StyleGuide from '../pages/StyleGuide';

// TODO: Добавить 404
export default (isAuthorization) => (
    <Switch>
        <Route exact component={HelloPage} path='/' />
        <Route component={ListCourt} path={configPathRouter.listCourt} />
        <Route component={ListTrainer} path={configPathRouter.listTrainer} />
        <Route component={ScheduleTrainer} path={`${configPathRouter.scheduleTrainer}/:slug`} />
        {/*<Route component={ScheduleCourt} path={configPathRouter.scheduleCourt} />*/}
        <Route render={() => {
            console.log(isAuthorization);
            if(isAuthorization.isAuthorization) {
                return <Redirect to='/' />
            } else {
                return <Registration />
                // eslint-disable-next-line
            };
        }} path={configPathRouter.registration} />
        <Route render={() => {
            if(isAuthorization.isAuthorization) {
                return <Redirect to='/' />
            } else {
                return <Auth />
                // eslint-disable-next-line
            };
        }} path={configPathRouter.authorization} />
        <Route component={MyBooking} path={configPathRouter.myBooking} />
        <Route component={ErrorPage} path="/error" />

        <Route component={StyleGuide} path={"/style-guide"} />

        <Route component={TestRequest} path="/test-request" />

    </Switch>
);
