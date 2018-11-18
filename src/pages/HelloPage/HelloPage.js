import React, { Component } from 'react';
import { Link } from "react-router-dom";

class HelloPage extends Component {

    render() {
        return(
            <nav className="b-hello-page">
                <ul className="b-hello-page__list">
                    <li className="b-hello-page__item">
                        <Link className="b-hello-link" to="/schedule-trainer">Мне нужен тренер</Link>
                    </li>
                    <li className="b-hello-page__item">
                        <Link className="b-hello-link" to="/schedule-court">Мне нужен корт</Link>
                    </li>
                    <li className="b-hello-page__item">
                        <Link className="b-hello-link" to="/authentication-trainer">Я тренер</Link>
                    </li>
                    <li className="b-hello-page__item">
                        <Link className="b-hello-link" to="/authentication-administrator">Я администратор корта</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default HelloPage;