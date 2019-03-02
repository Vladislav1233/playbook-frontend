// react, redux
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../store/actions/toggleMenu';
import { toggleCabinet } from '../../store/actions/toggleCabinet';
import { Link } from 'react-router-dom';
import { configPathRouter } from '../../App/configPathRouter';
import cn from 'classnames';

// Style
import '../../style/bem-blocks/b-menu/index.scss';
import '../../style/bem-blocks/b-hamburger/index.scss';


class MenuHeader extends Component {

    render() {
        console.log('render MenuHeader');

        const { location, isAuthorization } = this.props;
        const profileClassName = cn({
            'b-menu__item--cabinet': location === configPathRouter.profileUser || location === configPathRouter.profileTrainer || location ===  configPathRouter.profileCourt
        });
        const hamburgerStyle = cn('b-hamburger', {
            'open': this.props.toggleMenu
        });

        const profileLink = () => {
            const { userRole } = this.props;

            // TODO_AMED: из гамбургера над выпилить всё "моё"
            const nameLink = 'Личный кабинет >';

            const onToggle = () => {
                return (
                    <li className={`b-menu__item ${profileClassName}`}>
                        <a className="b-menu__link" href="" title="Личный кабинет" onClick={e => this.props.onToggleCabinet(e)}>{nameLink}</a>
                    </li>
                )
            }

            const onLink = (to) => {
                return (
                    <li className={`b-menu__item ${profileClassName}`}>
                        <Link className="b-menu__link" to={to} title="Личный кабинет">
                            {nameLink}
                        </Link>
                    </li>
                )
            }

            if (userRole[0] === 'user') {
                if (location === configPathRouter.profileUser) {
                    return onToggle();
                } else {
                    return onLink(configPathRouter.profileUser);
                }
            }

            if (userRole[0] === 'trainer') {
                if (location === configPathRouter.profileTrainer) {
                    return onToggle();
                } else {
                    return onLink(configPathRouter.profileTrainer);
                }
            }

            if (userRole[0] === 'organization-admin') {
                if (location === configPathRouter.profileCourt) {
                    return onToggle();
                } else {
                    return onLink(configPathRouter.profileCourt);
                }
            }
        };

        return (
            <Fragment>

                <a href="" className={hamburgerStyle}
                    onClick={e => {
                        this.props.onToggleMenu(e);
                        this.props.onToggleCabinet(e, 'close');
                    }}
                >
                    <svg viewBox="0 0 800 600">
                        <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="b-hamburger__top-bar"></path>
                        <path d="M300,320 L540,320" className="b-hamburger__middle-bar"></path>
                        <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" className="b-hamburger__bottom-bar" transform="translate(480, 320) scale(1, -1) translate(-480, -318)"></path>
                    </svg>
                </a>

                <aside className={`b-menu ${this.props.toggleMenu ? 'open' : ''}`}>
                    <header className="b-menu__header"></header>
                    <section className="b-menu__body">
                        <ul className="b-menu__list">
                            <li className="b-menu__item">
                                {/* TODO: Сделать попап с выбором городов. По клику на ссылку менять город */}
                                <a className="b-menu__link b-menu__link--disabled" href="" title="Ваш город">Ваш город: Ульяновск</a>
                            </li>
                            <li className="b-menu__item">
                                <a className="b-menu__link b-menu__link--disabled" href="" title="Ваш город">Язык: Русский</a>
                            </li>
                        </ul>

                        <ul className="b-menu__list b-menu__list--main">
                            <li className="b-menu__item">
                                <Link className="b-menu__link" to={configPathRouter.listTrainer}>Мне нужен тренер</Link>
                            </li>
                            <li className="b-menu__item">
                                <Link className="b-menu__link b-menu__link--disabled" to={configPathRouter.listTrainer}>Мне нужен корт</Link>
                            </li>
                        </ul>

                        <ul className="b-menu__list">
                            <li className="b-menu__item">
                                <a className="b-menu__link b-menu__link--disabled" href="" title="Написать нам">Написать нам</a>
                            </li>
                            <li className="b-menu__item">
                                <a className="b-menu__link b-menu__link--disabled" href="" title="Позвонить нам"> +7 (999) 000-00-00</a>
                            </li>
                            <li className="b-menu__item">
                                <a className="b-menu__link b-menu__link--disabled" href="" title="Помощь">Помощь</a>
                            </li>
                        </ul>

                        <ul className="b-menu__social-list">
                            <li className="b-menu__social-item">
                                <i className="fab fa-google-play"></i>
                            </li>
                            <li className="b-menu__social-item">
                                <i className="fab fa-apple"></i>
                            </li>
                        </ul>

                        <footer>
                            <small className="b-menu__copyright">© playbook 2018-2019 • все права защищены</small>
                        </footer>
                    </section>
                </aside>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ toggleMenu, identificate }) => {
    return {
       toggleMenu: toggleMenu.toggleMenu,
       isAuthorization: identificate.authorization,
       userRole: identificate.userRole
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleMenu: (e) => {
            e.preventDefault();
            dispatch(toggleMenu());
        },
        onToggleCabinet: (e, status) => {
            e.preventDefault();
            dispatch(toggleCabinet(status));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHeader);
