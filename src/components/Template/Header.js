import React, { Component } from 'react';
// import './style/Header.scss';

import MenuHeader from './MenuHeader';

class Header extends Component {
    render() {
        return (
            <header className="b-header">
                <MenuHeader />
                
                {/*TODO: здесь меняем в зависимости от  того, чье расписание сейчас смотрим: переключаем расписание между кортом и тренером (наверное с помощью router) */}
                <a className="b-header__get-schedule" href="" title=''>Мне нужен корт</a>
            </header>
        );
    }
}

export default Header;
