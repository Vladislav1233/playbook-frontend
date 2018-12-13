// react, redux, routing
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';
import { configPathRouter } from './configPathRouter';

// component
// import ScheduleTrainer from '../pages/ScheduleTrainer/ScheduleTrainer';
import Header from '../components/Template/Header';
import CoverPage from '../components/CoverPage/CoverPage';
import AppUserTemplate from './AppUserTemplate';

// style
import '../style/bem-blocks/b-page-wrapper/index.scss';
import '../style/bem-blocks/b-main/index.scss';

class App extends Component {
    // constructor(props) {
    //     super(props);

    //     const { dispatch } = this.props;
    //     history.listen((location, action) => {
    //         // clear alert on location change
    //         // dispatch(alertActions.clear());
    //     });
    // }

    render() {
        console.log(configPathRouter.scheduleTrainer);
        const { roleUser, location, toggleMenu } = this.props;

        const pageWrapperClass = cn('b-page-wrapper', {
            'no-scroll': toggleMenu,
            'b-page-wrapper--overflow': location.pathname === '/authentication-trainer' || location.pathname ===  '/auth'
        })

        const mainClass = cn('b-main', {
            'b-main--schedule-court': location.pathname === configPathRouter.scheduleCourt,
            'b-main--schedule': location.pathname === configPathRouter.scheduleCourt || location.pathname === configPathRouter.scheduleTrainer
        })

        return (
            <div className={pageWrapperClass}>
                {location.pathname !== configPathRouter.authorization
                    ? <Header location={location.pathname} />
                    : null
                }

                <main 
                    className={mainClass}
                >
                    {roleUser === 'guest' 
                        ? <AppUserTemplate />
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

export default withRouter(connect(mapStateToProps)(App));
