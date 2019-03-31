// react, redux
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import cn from 'classnames';

// style
import '../../style/bem-blocks/b-header/index.scss';
import '../../style/bem-blocks/b-logotype/index.scss';
import { configPathRouter } from '../../App/configPathRouter';


// component
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
                        {/* Логотип */ }
                        <div className="b-header__left">
                            <Link className="b-logotype" to='/'>
                                <img className="b-logotype__image" src={ tennisBallIcon } alt="Логотип - теннисный мяч" />
                                <span className="b-logotype__text">PlayBook</span>
                            </Link>
                        </div>

                        {/* Основные ссылки */ }
                        { !onRegistrationPages &&
                            <div className="b-header__center">
                                <nav className="b-header__nav-list">
                                    <Link className="b-header__nav-item" to={ configPathRouter.listTrainer }> Тренеры </Link>
                                    <Link className="b-header__nav-item disabled" to={ configPathRouter.myBooking }>Площадки</Link>
                                    <Link className="b-header__nav-item disabled" to={ configPathRouter.myBooking }>Турниры</Link>
                                </nav>
                            </div>
                        }

                        {/* Профиль */ }
                        { !onRegistrationPages &&
                            <div className="b-header__right">
                                <HeadMenu
                                    location={ this.props.location }
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
