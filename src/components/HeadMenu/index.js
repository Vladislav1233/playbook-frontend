import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// Note: style
import '../../style/bem-blocks/b-head-menu/index.scss';

class HeadMenu extends Component {
    state = {
        showContent: false
    };

    toggleContent = (e) => {

    };

    render() {
        // const svgDown = () => {
        //     return(
        //         <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 240.811 240.811" space="preserve" width="15px" height="15px">
        //             <g>
        //                 <path id="Expand_More" d="M220.088,57.667l-99.671,99.695L20.746,57.655c-4.752-4.752-12.439-4.752-17.191,0   c-4.74,4.752-4.74,12.451,0,17.203l108.261,108.297l0,0l0,0c4.74,4.752,12.439,4.752,17.179,0L237.256,74.859   c4.74-4.752,4.74-12.463,0-17.215C232.528,52.915,224.828,52.915,220.088,57.667z" fill="#933EC5"/>
        //             </g>
        //         </svg>
        //     )
        // };

        return(
            <div className="b-head-menu">
                <a className="b-head-menu__open-button" href="">
                    <div className="b-head-menu__image-wrapper">
                        <img className="b-head-menu__image" src="https://i.pinimg.com/236x/9f/8f/cd/9f8fcdc389c0d84cc88e3f7ca81b7c4e--dont-judge-me-minions-love.jpg" alt=""/>
                    </div>
                </a>
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
                            <a href="" className="b-head-menu__content-text" title="Выйти">Выйти</a>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}

export default HeadMenu;