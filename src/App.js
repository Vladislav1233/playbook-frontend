// react, redux
import React, { Component } from 'react';
import { connect } from 'react-redux';

// component
import Schedule from './pages/Schedule/Schedule';
import Header from './components/Template/Header';
import CoverPage from './components/CoverPage/CoverPage';

// style
import './style/bem-blocks/b-page-wrapper/index.scss';
import './style/bem-blocks/b-main/index.scss';

class App extends Component {

    render() {
        return (
            <div className={`b-page-wrapper ${this.props.toggleMenu ? 'no-scroll' : ''}`}>
                <Header/>
                <main className="b-main">
                    <Schedule/>
                </main>
                <CoverPage />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        toggleMenu: state.toggleMenu.toggleMenu
    }
}

export default connect(mapStateToProps)(App);
