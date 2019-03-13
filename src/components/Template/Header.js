// react, redux
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import cn from 'classnames';

// style
import '../../style/bem-blocks/b-header/index.scss';
import '../../style/bem-blocks/b-logotype/index.scss';

// component
import MenuHeader from './MenuHeader';
import HeadMenu from '../HeadMenu';

import tennisBallIcon from '../../style/images/icon/logo.svg';
// import Registration from '../../pages/Registration/Registration';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthorization: {
                is: false,
                roleUser: null
            }
        }
    }

    render() {
        console.log('render Header');

        const { location } = this.props;
        const onRegistrationPages = (location.pathname === '/registration') || (location.pathname === '/authorization');

        const rootClassHeader = cn(
            'b-header',
            {
                'b-header--light': onRegistrationPages,
            }
        )

        return (
            <header className={ rootClassHeader }>
                <div className="container">
                    <div className="b-header__wrapper">
                        {/* Гамбургер */}
                        { !onRegistrationPages &&
                            <div className="b-header__left">
                                <MenuHeader 
                                    isAuthorization={this.state.isAuthorization}
                                    location={this.props.location}
                                />
                            </div>
                        }

                        {/* Логотип */}
                        { location.pathname !== '/' &&
                            <div className="b-header__center">
                                <Link className="b-logotype" to='/'>
                                    <img className="b-logotype__image" src={tennisBallIcon} alt="Логотип - теннисный мяч"/>
                                    <span className="b-logotype__text">PlayBook</span>
                                </Link>
                            </div>
                        }

                        {/* Профиль */}
                        { !onRegistrationPages &&
                            <div className="b-header__right">
                                <HeadMenu 
                                    location={this.props.location}
                                />
                            </div>
                        }
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
