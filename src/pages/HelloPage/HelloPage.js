import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { configPathRouter } from '../../App/configPathRouter';
import { connect } from "react-redux";

// style
import '../../style/bem-blocks/b-button/index.scss';
import '../../style/bem-blocks/b-hello-page/index.scss';

import tennisBallIcon from '../../style/images/icon/logo.svg';

class HelloPage extends Component {

    render() { 
        const { isAuthorization, userRole } = this.props;
        console.log(isAuthorization);

        const profileTo = () => {
            const whoUser = userRole[0];

            if (whoUser === 'trainer') {
                return configPathRouter.profileTrainer;
            } else if (whoUser === 'organization-admin') {
                return configPathRouter.profileCourt;
            } else if (whoUser === 'user') {
                return configPathRouter.profileUser;
            }
        };
        
        return(
            <div className="container">
                <div className="b-hello-page">
                    <h1 className="b-hello-page__head">
                        <img className="b-hello-page__logo" src={tennisBallIcon} alt="Логотип - теннисный мяч" />
                        PlayBook
                    </h1>
                    <h2 className="b-hello-page__heading">
                        Забронируй корт для  тенниса и играй в удобное для тебя время
                    </h2>
                    <nav className="b-hello-page__nav">
                        <ul className="b-hello-page__list">
                            {/* <li className="b-hello-page__item">
                                <Link className="b-button b-button--hollow b-button--hello-page" to={configPathRouter.listCourt}>Мне нужен корт</Link>
                            </li> */}
                            <li className="b-hello-page__item">
                                <Link 
                                    className="b-button b-button--hollow b-button--hello-page" 
                                    to={configPathRouter.listTrainer}
                                >
                                    Мне нужен тренер
                                </Link>
                            </li>
                        </ul>

                        { isAuthorization
                            ? <ul className="b-hello-page__list">
                                <li className="b-hello-page__item">
                                    <Link 
                                        className="b-button b-button--hollow b-button--hello-page" 
                                        to={configPathRouter.myBooking}
                                    > 
                                        Мои бронирования
                                    </Link>
                                </li>
                                <li className="b-hello-page__item">
                                    <Link 
                                        className="b-button b-button--hollow b-button--hello-page" 
                                        to={profileTo()}
                                    >
                                        Личный кабинет
                                    </Link>
                                </li>
                              </ul>
                            : null
                        }
                    </nav>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ identificate }) => {
    console.log(identificate);
    return {
        isAuthorization: identificate.authorization,
        userRole: identificate.userRole
    }
};

export default connect(mapStateToProps)(HelloPage);
