import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/reducers/configureStore';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={App} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
