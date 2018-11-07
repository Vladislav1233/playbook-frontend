import React from 'react';
import { Switch, Route } from 'react-router-dom';

// component
import ScheduleTrainer from '../pages/ScheduleTrainer/ScheduleTrainer';
import ScheduleCourt from '../pages/ScheduleCourt/ScheduleCourt';
import HelloPage from '../pages/HelloPage/HelloPage';
import Registration from '../pages/Registration/Registration';

// TODO: Добавить 404
export default () => (
    <Switch>
        <Route exact component={HelloPage} path='/' />
        <Route component={ScheduleTrainer} path="/schedule-trainer" />
        <Route component={ScheduleCourt} path="/schedule-court" />
        <Route component={Registration} path="/authentication-trainer" />
    </Switch>
);