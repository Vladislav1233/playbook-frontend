import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/reducers/configureStore';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './helpers/history';

const store = configureStore();
console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path='/' component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
