import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { connect } from "react-redux";
import { userActions } from '../../store/actions/userAction';
import { configPathRouter } from '../../App/configPathRouter';
import OutsideClickHandler from 'react-outside-click-handler';


// helpers
import { history } from '../../helpers/history';

// Note: style
import '../../style/bem-blocks/b-head-menu/index.scss';

// Note: image
import avaImg from '../../style/images/ava-blank-1.png';

const ContentItem = ({ children }) => {
    return(
        <ul className="b-head-menu__content-list">
            {children}
        </ul> 
    )
};

class HeadMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showContent: false
        };

        history.listen(() => {
            this.closeContent();
        });
    }

    toggleContent = (e) => {
        e.preventDefault();

        this.setState({
            ...this.state,
            showContent: !this.state.showContent
        })
    };

    closeContent = () => {
        this.setState({
            showContent: false
        })
    };

    render() {
        console.log('renderHeadMenu');
        const { showContent } = this.state;
        const { isAuthorization, userInformation, userRole, location} = this.props;

        const classNameBlock = cn('b-head-menu', {
            'b-head-menu--open': showContent
        });

        const getDataAboutRole = (userRole) => {
            if (userRole === 'trainer') {
                return {
                    pathToCreateSchedule: configPathRouter.profileCreateSchedule,
                    pathToMySchedule: configPathRouter.profileMySchedule,
                    pathToRequest: "/profile/booking-request",
                    pathToInfo: "/profile/trainer-info",
                    roleName: 'Тренер'
                }
            } else if (userRole === 'user') {
                return {
                    pathProfile: configPathRouter.profileUser,
                    roleName: 'Игрок'
                } 
            } else if (userRole === 'organization-admin') {
                return // TODO
            } else if (userRole === 'admin') {
                return // TODO
            };
        };
        let dataAboutRole = {};
        if (isAuthorization) {
            dataAboutRole = getDataAboutRole(userRole[0]); 
        };

        return(
            <div className={classNameBlock}>
                <OutsideClickHandler 
                    onOutsideClick={() => {
                        console.log('onOutsideClick');
                        this.closeContent();
                    }}
                    display="inline-block"
                >   
                    {isAuthorization 
                        ? <a onClick={this.toggleContent} className="b-head-menu__open-button" href="/">
                            <div className="b-head-menu__account-wrapper">
                                <span className="b-head-menu__account-name">{ userInformation.firstName }</span>
                                <div className="b-head-menu__image-wrapper b-head-menu__image-wrapper--blank">
                                    <img className="b-head-menu__image" src={avaImg} alt=""/>
                                </div>
                            </div>
                        </a>
                        : (location.pathname === '/') ?
                            <div className="b-head-menu__wrapper-link">
                                <Link className="b-head-menu__open-button" to={configPathRouter.authorization}>Вход</Link>
                                <Link className="b-head-menu__open-button" to={configPathRouter.registration}>Регистрация</Link>
                            </div>
                            : <a onClick={this.toggleContent} className="b-head-menu__open-button" href="/">
                                Войти
                            </a>
                    }
                    {showContent &&
                        <div className="b-head-menu__content">
                            {isAuthorization 
                                ? <Fragment>
                                    <div className="b-head-menu__content-header">
                                        <span className="b-head-menu__content-text b-head-menu__content-text--name">{`${userInformation.firstName} ${userInformation.lastName}`}</span>
                                        <div className="b-head-menu__content-additional">{dataAboutRole.roleName}</div>
                                    </div> 

                                    {/* Блок личного кабинета */}
                                    { (dataAboutRole.roleName === "Игрок") ? null :
                                        <ContentItem>
                                            <li className="b-head-menu__content-item">
                                                <Link className="b-head-menu__content-text" to={dataAboutRole.pathToCreateSchedule}>Добавить расписание</Link>
                                            </li>
                                            <li className="b-head-menu__content-item">
                                                <Link className="b-head-menu__content-text" to={dataAboutRole.pathToMySchedule}>Моё расписание</Link>
                                            </li>
                                            <li className="b-head-menu__content-item">
                                                <Link className="b-head-menu__content-text" to={dataAboutRole.pathToRequest}>Входящие запросы</Link>
                                            </li>
                                            <li className="b-head-menu__content-item">
                                                <Link className="b-head-menu__content-text" to={dataAboutRole.pathToInfo}>Обо мне</Link>
                                            </li>
                                        </ContentItem>
                                    }

                                    <ContentItem>
                                        <li className="b-head-menu__content-item">
                                            <Link className="b-head-menu__content-text" to={configPathRouter.myBooking}>Мои бронирования</Link>
                                        </li>
                                    </ContentItem>

                                    <ContentItem>
                                        <li className="b-head-menu__content-item">
                                            <a href="" className="b-head-menu__content-text" onClick={this.props.onLogout}>Выйти</a>
                                        </li>
                                    </ContentItem>
                                </Fragment>
                                : <Fragment>
                                    <ContentItem>
                                        <li className="b-head-menu__content-item">
                                            <Link className="b-head-menu__content-text" to={configPathRouter.authorization}>Вход</Link>
                                        </li>
                                        <li className="b-head-menu__content-item">
                                            <Link className="b-head-menu__content-text" to={configPathRouter.registration}>Регистрация</Link>
                                        </li>
                                    </ContentItem>
                                </Fragment>

                            }

                        </div>
                    }
                </OutsideClickHandler>
            </div>
        )
    }
}

const mapStateToProps = ({ identificate }) => {
    return {
        isAuthorization: identificate.authorization,
        userInformation: identificate.userInformation,
        userRole: identificate.userRole
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: e => {
            e.preventDefault();
            dispatch(userActions.logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadMenu);
