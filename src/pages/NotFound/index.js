import React from 'react';
import { Link } from "react-router-dom";

// style
import '../../style/bem-blocks/b-not-found/index.scss';

const NotFound = () => {
    return (
      <div className="b-not-found">
        <div className="container">
          <h1>
            404
          </h1>
          <div>
            <h2>Складывается ощущение что вы заблудились...</h2>
            <p className="b-not-found__description">
              Давай вернёмся <Link className="link-in-text-white" to="/">на главную</Link> и попробуем ещё раз.
            </p>
          </div>
        </div>
      </div>
    )
};

export default NotFound;
