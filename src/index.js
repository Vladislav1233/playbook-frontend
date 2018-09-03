import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { toggleSchedule, initialStateToggleSchedule } from './reducers/reducers'

const store = createStore(toggleSchedule, initialStateToggleSchedule)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 

    document.getElementById('root'));
registerServiceWorker();
