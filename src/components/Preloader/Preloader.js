import React, { Component } from 'react';

// style
import '../../style/bem-blocks/b-preloader/index.scss';

class Preloader extends Component {
    render() {
        return(
            <div className="b-preloader">
                <svg className="b-preloader__filter" version="1.1">
                    <defs>
                        <filter id="gooeyness">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="gooeyness" />
                            <feComposite in="SourceGraphic" in2="gooeyness" operator="atop" />
                        </filter>
                    </defs>
                </svg>
                <div className="b-preloader__dots">
                    <div className="b-preloader__dot b-preloader__dot--main-dot"></div>
                    <div className="b-preloader__dot"></div>
                    <div className="b-preloader__dot"></div>
                    <div className="b-preloader__dot"></div>
                    <div className="b-preloader__dot"></div>
                </div>
            </div>
        )
    }
}

export default Preloader;
