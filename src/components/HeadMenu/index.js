import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { connect } from "react-redux";
import { userActions } from '../../store/actions/userAction';

// Note: style
import '../../style/bem-blocks/b-head-menu/index.scss';

// Note: image
import avaImg from '../../style/images/ava.jpg';

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
                        <img className="b-head-menu__image" src={avaImg} alt=""/>
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
                                <a href="" className="b-head-menu__content-text" title="Выйти" onClick={this.props.onLogout}>Выйти</a>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: e => {
            e.preventDefault();
            dispatch(userActions.logout());
        }
    }
}

export default connect(null, mapDispatchToProps)(HeadMenu);
