// react, redux
import React, { Component } from 'react';
import { connect } from 'react-redux';

// component
// import ScheduleTrainer from '../pages/ScheduleTrainer/ScheduleTrainer';
import Header from '../components/Template/Header';
import CoverPage from '../components/CoverPage/CoverPage';
import AppUserTemplate from './AppUserTemplate';

// style
import '../style/bem-blocks/b-page-wrapper/index.scss';
import '../style/bem-blocks/b-main/index.scss';

class App extends Component {
    render() {
        const {roleUser} = this.props;

        return (
            <div className={`b-page-wrapper ${this.props.toggleMenu ? 'no-scroll' : ''}`}>
                <Header />
                <main className="b-main">
                    {
                        roleUser === 'guest' ?
                            <AppUserTemplate />
                    
                        : <div>404</div> // TODO: поставить страницу 404
                    }
                </main>
                <CoverPage />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        toggleMenu: state.toggleMenu.toggleMenu,
        roleUser: state.roleUser.role
    }
};

export default connect(mapStateToProps)(App);
