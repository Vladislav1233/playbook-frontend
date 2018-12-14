import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { configPathRouter } from '../../App/configPathRouter';

// style
import '../../style/bem-blocks/b-button/index.scss';
import '../../style/bem-blocks/b-hello-page/index.scss';

class HelloPage extends Component {

    render() {
        return(
            <nav className="b-hello-page">
                <ul className="b-hello-page__list">
                    <li className="b-hello-page__item">
                        <Link className="b-button b-button--orange b-button--hello-page" to={configPathRouter.listCourt}>Мне нужен корт</Link>
                    </li>
                    <li className="b-hello-page__item">
                        <Link className="b-button b-button--orange b-button--hello-page" to={configPathRouter.listTrainer}>Мне нужен тренер</Link>
                    </li>
                </ul>

                <ul className="b-hello-page__list">
                    <li className="b-hello-page__item">
                        <Link className="b-button b-button--orange b-button--hello-page" to={configPathRouter.authorization}>Авторизация</Link>
                    </li>
                    <li className="b-hello-page__item">
                        <Link className="b-button b-button--orange b-button--hello-page" to={configPathRouter.registration}>Регистрация</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default HelloPage;
