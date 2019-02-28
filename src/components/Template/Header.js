// react, redux
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

// style
import '../../style/bem-blocks/b-header/index.scss';
import '../../style/bem-blocks/b-logotype/index.scss';

// component
import MenuHeader from './MenuHeader';
import HeadMenu from '../HeadMenu';

import tennisBallIcon from '../../style/images/icon/logo.svg';

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

        return (
            <header className="b-header">
                <div className="container">
                    <div className="b-header__wrapper">
                        <div className="b-header__left">
                            <MenuHeader 
                                isAuthorization={this.state.isAuthorization}
                                location={this.props.location}
                            />
                        </div>

                        <div className="b-header__center">
                            {location.pathname !== '/' 
                                ? <Link className="b-logotype" to='/'>
                                    <img className="b-logotype__image" src={tennisBallIcon} alt="Логотип - теннисный мяч"/>
                                    <span className="b-logotype__text">PlayBook</span>
                                </Link>
                                : null
                            }
                        </div>
                        
                        <div className="b-header__right">
                            <HeadMenu />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
