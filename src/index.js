import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/reducers/configureStore';
import { HashRouter, Switch, Route } from 'react-router-dom';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/' component={App} />
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
