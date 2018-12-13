import ProfileTrainer from '../pages/ProfileTrainer';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { configPathRouter } from './configPathRouter';

// Note: components 
import ScheduleCourt from '../pages/ScheduleCourt/ScheduleCourt';

export default () => (
  <Switch>
    <Route component={ProfileTrainer} path={configPathRouter.profileTrainer} />
    <Route component={ScheduleCourt} path={configPathRouter.scheduleCourt} />
  </Switch>
);