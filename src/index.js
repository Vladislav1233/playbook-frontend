import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/reducers/configureStore';
import { Router } from 'react-router-dom';
import { history } from './helpers/history';

export const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {/* <Route path='/' component={App} /> */}
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
