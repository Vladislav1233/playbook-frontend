// react, redux
import React, { Component } from 'react';

// component
import Schedule from './pages/Schedule/Schedule';
import Header from './components/Template/Header';

// style

class App extends Component {

    render() {
        return (
            <div className="b-page-wrapper">
                <Header/>
                <div className="b-main">
                    <Schedule/>
                </div>
            </div>
        );
    }
}

export default App;
