// react, redux
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// style
import '../../style/bem-blocks/b-header/index.scss';
import '../../style/bem-blocks/b-logotype/index.scss';

// component
import MenuHeader from './MenuHeader';

import tennisBallIcon from '../../style/images/icon/tennis-ball.svg';

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
        return (
            <header className="b-header">
                <div className="container">
                    <div className="b-header__wrapper">
                        <MenuHeader 
                            isAuthorization={this.state.isAuthorization}
                            location={this.props.location}
                        />

                        {/* TODO: для главной страницы не надо сслыку to выводить, чтобы не перерендеривало при клике */}
                        <Link className="b-logotype" to='/'>
                            <img className="b-logotype__image" src={tennisBallIcon} alt="На главную"/>
                            <span className="b-logotype__text">На главную</span>
                        </Link>
                        
                        {/*TODO: здесь меняем в зависимости от  того, чье расписание сейчас смотрим: переключаем расписание между кортом и тренером (наверное с помощью router) */}
                        {/*<a className="b-header__get-schedule" href="" title=''>Мне нужен корт</a>*/}
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
