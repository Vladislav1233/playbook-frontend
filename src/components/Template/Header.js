// react, redux
import React, { Component } from 'react';

// style
import '../../style/bem-blocks/b-header/index.scss';

// component
import MenuHeader from './MenuHeader';

class Header extends Component {
    render() {
        console.log('render Header');
        return (
            <header className="b-header">
                <div className="container">
                    <div className="b-header__wrapper">
                        <MenuHeader />
                        
                        {/*TODO: здесь меняем в зависимости от  того, чье расписание сейчас смотрим: переключаем расписание между кортом и тренером (наверное с помощью router) */}
                        <a className="b-header__get-schedule" href="" title=''>Мне нужен корт</a>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
