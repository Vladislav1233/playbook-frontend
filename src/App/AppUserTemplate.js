import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// component
import ScheduleTrainer from '../pages/ScheduleTrainer/ScheduleTrainer';
import ScheduleCourt from '../pages/ScheduleCourt/ScheduleCourt';

// TODO: Добавить 404
// TODO: Убрать Redirect когда сделаю приветственную страницу
export default () => (
    <Switch>
        <Redirect from="/" exact to={{ pathname: '/ISport/schedule-court' }} />
        <Route component={ScheduleTrainer} path="/ISport/schedule-trainer" />
        <Route component={ScheduleCourt} path="/ISport/schedule-court" />
    </Switch>
);