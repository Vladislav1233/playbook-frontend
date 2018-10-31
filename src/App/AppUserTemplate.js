import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// component
import ScheduleTrainer from '../pages/ScheduleTrainer/ScheduleTrainer';

// TODO: Добавить 404
// TODO: Убрать Redirect когда сделаю приветственную страницу
export default () => (
    <Switch>
        <Redirect from="/" exact to={{ pathname: '/schedule-trainer' }} />
        <Route component={ScheduleTrainer} path="/schedule-trainer" />
    </Switch>
);