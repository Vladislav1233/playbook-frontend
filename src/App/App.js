// react, redux, routing
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';
import { configPathRouter } from './configPathRouter';

import {
    AppUserTemplate,
    AppTrainerTemplate
} from './routeConfig';

// Note: actions
import { alertActions } from '../store/actions/alertAction'

// component
import Header from '../components/Template/Header';
import Footer from '../components/Template/Footer';
import Alert from '../components/ui-kit/Alert';

// style
import '../style/bem-blocks/b-page-wrapper/index.scss';
import '../style/bem-blocks/b-main/index.scss';

class App extends Component {

    render() {
        const {
            location,
            toggleMenu,
            userRole,
            scrollPage,
            alertMessage,
            alertType,
            isAuthorization
        } = this.props;

        const howLocation = location.pathname.split('/');
        const howRouterConfig = (value) => {
            const newValue = value.split('/');
            return newValue[1];
        };

        const pageWrapperClass = cn('b-page-wrapper', {
            'no-scroll': toggleMenu || scrollPage, // TODO: через screen snap сделать позицию страницы не дерганной.
            // 'b-page-wrapper--overflow': location.pathname === '/authentication-trainer' || location.pathname === configPathRouter.authorization
        })

        const mainClass = cn('b-main', {
            'b-main--schedule-court': location.pathname === configPathRouter.scheduleCourt,
            'b-main--schedule': location.pathname === configPathRouter.scheduleCourt || howLocation[1] === howRouterConfig(configPathRouter.scheduleTrainer),
            'b-main--hello-page': location.pathname === '/',
        });

        const renderRoutePage = () => {
            switch (userRole ? userRole[0] : '') {
                case 'user':
                    return <AppUserTemplate isAuthorization={isAuthorization} />

                case 'trainer':
                    return <AppTrainerTemplate isAuthorization={isAuthorization} />

                case 'organization-admin':
                    break;

                case 'admin':
                    break;

                default:
                    return <AppUserTemplate />
            }
        }

        return (
            <div className={pageWrapperClass}>
                <Header location={location.pathname} />
                <main className={mainClass}>
                    {renderRoutePage()}
                </main>
                <Footer location={ location.pathname } />

                {alertMessage ?
                    <Alert buttonOk type={alertType} closeAlert={this.props.closeAlert}>
                        {alertMessage}
                    </Alert>
                : null}
            </div>
        );
    }
}

const mapStateToProps = ({ toggleMenu, identificate, scrollPage, alertReducer }) => {
    return {
        toggleMenu: toggleMenu.toggleMenu,
        userRole: identificate.userRole,
        isAuthorization: identificate.authorization,
        scrollPage: scrollPage.isNotScrollPage,
        alertMessage: alertReducer.message,
        alertType: alertReducer.type
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeAlert: () => dispatch(alertActions.clear())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
