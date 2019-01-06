import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

// Note: style
import '../../style/bem-blocks/b-head-menu/index.scss';

class HeadMenu extends Component {
    state = {
        showContent: false
    };

    toggleContent = (e) => {
        e.preventDefault();

        this.setState({
            ...this.state,
            showContent: !this.state.showContent
        })
    };

    render() {
        const { showContent } = this.state;
        const classNameBlock = cn('b-head-menu', {
            'b-head-menu--open': showContent
        });

        return(
            <div className={classNameBlock}>
                <a onClick={this.toggleContent} className="b-head-menu__open-button" href="">
                    <div className="b-head-menu__image-wrapper">
                        <img className="b-head-menu__image" src="https://i.pinimg.com/236x/9f/8f/cd/9f8fcdc389c0d84cc88e3f7ca81b7c4e--dont-judge-me-minions-love.jpg" alt=""/>
                    </div>
                </a>
                {showContent ?
                    <div className="b-head-menu__content">

                        <ul className="b-head-menu__content-list">
                            <li className="b-head-menu__content-item">
                                <span className="b-head-menu__content-text b-head-menu__content-text--name">Владислав Довженко</span>
                                <div className="b-head-menu__content-additional">Тренер</div>
                            </li>
                        </ul>

                        <ul className="b-head-menu__content-list">
                            <li className="b-head-menu__content-item">
                                <Link className="b-head-menu__content-text" to="">Личный кабинет</Link>
                            </li>
                        </ul>

                        <ul className="b-head-menu__content-list">
                            <li className="b-head-menu__content-item">
                                <a href="" className="b-head-menu__content-text" title="Выйти">Выйти</a>
                            </li>
                        </ul>

                    </div>
                : 
                    null
                }
            </div>
        )
    }
}

export default HeadMenu;