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

        // const { location, isAuthorization } = this.props;
        // const profileClassName = cn({
        //     'b-menu__item--cabinet': location === configPathRouter.profileUser || location === configPathRouter.profileTrainer || location ===  configPathRouter.profileCourt
        // });
        const hamburgerStyle = cn('b-hamburger', {
            'open': this.props.toggleMenu
        });

        // const profileLink = () => {
        //     const { userRole } = this.props;

        //     const nameLink = 'Личный кабинет >';

        //     const onToggle = () => {
        //         return (
        //             <li className={`b-menu__item ${profileClassName}`}>
        //                 <a className="b-menu__link" href="" title="Личный кабинет" onClick={e => this.props.onToggleCabinet(e)}>{nameLink}</a>
        //             </li>
        //         )
        //     }

        //     const onLink = (to) => {
        //         return (
        //             <li className={`b-menu__item ${profileClassName}`}>
        //                 <Link className="b-menu__link" to={to} title="Личный кабинет">
        //                     {nameLink}
        //                 </Link>
        //             </li>
        //         )
        //     }

        //     if (userRole[0] === 'user') {
        //         if (location === configPathRouter.profileUser) {
        //             return onToggle();
        //         } else {
        //             return onLink(configPathRouter.profileUser);
        //         }
        //     }

        //     if (userRole[0] === 'trainer') {
        //         if (location === configPathRouter.profileTrainer) {
        //             return onToggle();
        //         } else {
        //             return onLink(configPathRouter.profileTrainer);
        //         }
        //     }

        //     if (userRole[0] === 'organization-admin') {
        //         if (location === configPathRouter.profileCourt) {
        //             return onToggle();
        //         } else {
        //             return onLink(configPathRouter.profileCourt);
        //         }
        //     }
        // };

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

                <div className={`b-menu ${this.props.toggleMenu ? 'open' : ''}`}>
                    <div className="b-menu__header"></div>
                    <ul className="b-menu__list">
                        <li className="b-menu__item">
                            {/* TODO: Сделать попап с выбором городов. По клику на ссылку менять город */}
                            <a className="b-menu__link" href="" title="Ваш город">Ваш город: Ульяновск</a>
                        </li>

                        {/* <li className="b-menu__item">
                            <Link className="b-menu__link" to={configPathRouter.listCourt}>Мне нужен корт</Link>
                        </li> */}
                        <li className="b-menu__item">
                            <Link className="b-menu__link" to={configPathRouter.listTrainer}>Мне нужен тренер</Link>
                        </li>
                        
                        <li className="b-menu__item">
                            {/* TODO: Эта ссылка должна открывать попап, далее в попап вводим номер телефона, получаем свои брони и отменяем нужную, вобщем на клик по ссылке нужен обработчик дальнейшего шага (видимо попап уже) */}
                            <a className="b-menu__link" href="">Отменить бронь</a>
                        </li>
                        
                        {/* {isAuthorization ? (
                            profileLink()
                        ) : (
                            <li className="b-menu__item">
                                <Link className="b-menu__link" to={configPathRouter.authorization}>Авторизация</Link>
                                <Link className="b-menu__link" to={configPathRouter.registration}>Регистрация</Link>
                            </li>
                        )} */}
                        <li className="b-menu__item">
                            <a className="b-menu__link" href="" title="Написать нам">Написать нам</a>
                        </li>

                    </ul>
                </div>
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
