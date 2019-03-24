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
// import avaImg from '../../style/images/ava_1.svg';

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
            }
        };
        let dataAboutRole = {};
        if (isAuthorization) {
            dataAboutRole = getDataAboutRole(userRole[0]); 
        }

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
                                <div className="b-head-menu__image-wrapper">
                                    {/* <img className="b-head-menu__image" src={avaImg} alt=""/> */}
                                    <svg className="b-head-menu__image" xmlns="http://www.w3.org/2000/svg" width="71" height="65" viewBox="0 0 71 65" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M30.3918 47.9289C23.3689 46.0472 18.099 40.8887 15.7861 34.5391C16.253 33.0278 16.8469 31.8032 17.5741 30.8129C18.6299 29.375 20.0058 28.3774 21.8123 27.7248C22.764 27.381 23.565 27.1006 24.2611 26.8569C26.7765 25.9763 27.9223 25.5752 29.8649 24.3933C32.3616 22.8742 35.1361 20.2081 37.0691 17.8259C38.0306 16.6409 39.0003 15.3185 39.736 13.9588C40.4661 12.6093 41.0083 11.1461 41.0222 9.69536C41.0347 8.3861 40.7895 7.21751 40.1456 6.19071C40.5943 6.28086 41.0429 6.38582 41.4911 6.50591C49.3397 8.60892 54.9988 14.8043 56.7879 22.1811C55.4869 27.2509 52.5528 32.7645 49.4493 36.6482C45.8647 41.1338 41.0965 46.4884 34.1911 48.5917C32.9289 48.4869 31.6584 48.2683 30.3918 47.9289ZM39.7825 48.3179C47.679 46.8749 54.4373 41.0361 56.653 32.7671C57.1895 30.765 57.4241 28.7531 57.3847 26.7798C55.7797 30.8648 53.4382 34.8602 51.0117 37.8967C48.2764 41.3195 44.6719 45.501 39.7825 48.3179ZM15.23 21.6678C14.3515 24.9463 14.2824 28.2511 14.9004 31.3698C15.2167 30.7435 15.5695 30.1636 15.962 29.6291C17.2736 27.843 18.9879 26.6186 21.1328 25.8438C22.1499 25.4763 22.984 25.1839 23.6916 24.9359L23.6923 24.9356L23.693 24.9354C26.1433 24.0764 27.0743 23.7501 28.8253 22.6847C31.0655 21.3217 33.6741 18.8357 35.516 16.5657C36.442 15.4246 37.3254 14.2112 37.9769 13.0071C38.6339 11.7927 39.0128 10.664 39.0223 9.67622C39.0352 8.3207 38.7104 7.39427 37.9486 6.62454C37.6644 6.33745 37.308 6.06025 36.8631 5.79051C27.0363 5.35856 17.8812 11.7734 15.23 21.6678Z" fill="#DDDDDD" />
                                        <path d="M19.7001 46.6876C21.6374 49.303 29.2858 53.3256 39.0498 53.3256V64.2695H1.12723C1.39361 60.9035 0.604156 67.845 1.12723 60.8707C1.78107 52.1529 9.96137 49.801 12.5331 49.3196C15.6391 48.7382 17.7386 47.85 19.7001 46.6876Z" fill="#DDDDDD" />
                                        <path d="M51.0795 47.0229C49.1422 49.6382 39.6911 54.2085 28.3958 52.2467L32.0504 64.2695H69.973C69.7066 60.9035 70.4961 67.845 69.973 60.8707C69.3191 52.1529 61.1388 49.801 58.5671 49.3196C55.4611 48.7382 53.041 48.1853 51.0795 47.0229Z" fill="#DDDDDD" />
                                    </svg>
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
