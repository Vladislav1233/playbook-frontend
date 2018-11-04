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
        console.log(this.props.location);

        return (
            <div className={`b-page-wrapper ${this.props.toggleMenu ? 'no-scroll' : ''}`}>
                <Header />
                <main 
                    className={
                        `b-main ${this.props.location.pathname === '/ISport/schedule-court' ? 'b-main--schedule-court' : ''} ${this.props.location.pathname === '/ISport/schedule-court' ||  this.props.location.pathname === '/ISport/schedule-trainer' ? 'b-main--schedule' : ''}`
                    }
                >
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
