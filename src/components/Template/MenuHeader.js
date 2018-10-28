// react, redux
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../store/actions/toggleMenu';

// Style
import '../../style/bem-blocks/b-menu/index.scss';
import '../../style/bem-blocks/b-hamburger/index.scss';


class MenuHeader extends Component {

    render() {
        console.log('render MenuHeader');

        return (
            <Fragment>

                <a href="" className={`b-hamburger ${this.props.toggleMenu ? 'open' : ''}`} onClick={e => this.props.onToggleMenu(e)}>
                    <svg viewBox="0 0 800 600">
                        <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="b-hamburger__top-bar"></path>
                        <path d="M300,320 L540,320" className="b-hamburger__middle-bar"></path>
                        <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" className="b-hamburger__bottom-bar" transform="translate(480, 320) scale(1, -1) translate(-480, -318)"></path>
                    </svg>
                </a>

                <div className={`b-menu ${this.props.toggleMenu ? 'open' : ''}`}>
                    <ul className="b-menu__list">

                        <li className="b-menu__item">
                            <a className="b-menu__link" href="" title="Отменить бронь">Отменить бронь</a>
                        </li>
                        <li className="b-menu__item">
                            <a className="b-menu__link" href="" title="Ваш город">Ваш город: Ульяновск</a>
                        </li>
                        <li className="b-menu__item">
                            <a className="b-menu__link" href="" title="Войти в кабинет">Войти в кабинет</a>
                        </li>
                        <li className="b-menu__item">
                            <a className="b-menu__link" href="" title="Ваш город">Написать нам</a>
                        </li>

                    </ul>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
       toggleMenu: state.toggleMenu.toggleMenu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleMenu: (e) => {
            e.preventDefault();
            dispatch(toggleMenu())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHeader);
