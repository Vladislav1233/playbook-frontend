// react, redux
import React, { Component } from 'react';

// component
import Schedule from './pages/Schedule/Schedule';
import Header from './components/Template/Header';
import CoverPage from './components/CoverPage/CoverPage';

// style
import './style/bem-blocks/b-page-wrapper/index.scss';

class App extends Component {

    render() {
        return (
            <div className="b-page-wrapper">
                <Header/>
                <div className="b-main">
                    <Schedule/>
                </div>
                <CoverPage />
            </div>
        );
    }
}

export default App;
