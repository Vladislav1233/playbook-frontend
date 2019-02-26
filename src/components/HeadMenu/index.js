import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { connect } from "react-redux";
import { userActions } from '../../store/actions/userAction';
import { configPathRouter } from '../../App/configPathRouter';

// Note: style
import '../../style/bem-blocks/b-head-menu/index.scss';

// Note: image
import avaImg from '../../style/images/ava_2.svg';

const ContentItem = ({ children }) => {
    return(
        <ul className="b-head-menu__content-list">
            {children}
        </ul> 
    )
};

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
        const { isAuthorization, userInformation, userRole } = this.props;
        console.log(userInformation);

        const classNameBlock = cn('b-head-menu', {
            'b-head-menu--open': showContent
        });

        const getDataAboutRole = (userRole) => {
            if (userRole === 'trainer') {
                return {
                    pathProfile: configPathRouter.profileTrainer,
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
                <a onClick={this.toggleContent} className="b-head-menu__open-button" href="/">
                    { isAuthorization
                        ? (
                            <div className="b-head-menu__account-wrapper">
                                <span className="b-head-menu__account-name">{ userInformation.firstName }</span>
                                <div className="b-head-menu__image-wrapper">
                                    <img className="b-head-menu__image" src={avaImg} alt=""/>
                                </div>
                            </div>
                        ) : (
                            <span>Войти</span>
                        )
                    }
                </a>
                {showContent &&
                    <div className="b-head-menu__content">
                        {isAuthorization 
                            ? <Fragment>
                                <ContentItem>
                                    <li className="b-head-menu__content-item">
                                        <span className="b-head-menu__content-text b-head-menu__content-text--name">{`${userInformation.firstName} ${userInformation.lastName}`}</span>
                                        <div className="b-head-menu__content-additional">{dataAboutRole.roleName}</div>
                                    </li>
                                </ContentItem>

                                <ContentItem>
                                    <li className="b-head-menu__content-item">
                                        <Link className="b-head-menu__content-text" to={dataAboutRole.pathProfile}>Личный кабинет</Link>
                                    </li>
                                </ContentItem>

                                <ContentItem>
                                    <li className="b-head-menu__content-item">
                                        <a href="" className="b-head-menu__content-text" title="Выйти" onClick={this.props.onLogout}>Выйти</a>
                                    </li>
                                </ContentItem>
                            </Fragment>
                            :
                            <Fragment>
                                <ContentItem>
                                    <li className="b-head-menu__content-item">
                                        <Link className="b-head-menu__content-text" to={configPathRouter.authorization}>Авторизация</Link>
                                    </li>
                                    <li className="b-head-menu__content-item">
                                        <Link className="b-head-menu__content-text" to={configPathRouter.registration}>Регистрация</Link>
                                    </li>
                                </ContentItem>
                            </Fragment>
                        }

                    </div>
                }
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
