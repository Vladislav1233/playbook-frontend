import React, { Component } from 'react';
import cn from 'classnames';

// Note: styles
import '../../style/bem-blocks/b-search-list-playground/index.scss';

class SearchListPlayground extends Component {
    render() {
        const { namePlayground, addressPlayground, disabled, onChange, id, value, checked, hover } = this.props;
        const classNameBlock = cn('b-search-list-playground', {
            'b-search-list-playground--hover': hover
        })

        return(
            <label className={classNameBlock}>
                <input value={value} type='checkbox' className="b-search-list-playground__input" onChange={onChange} disabled={disabled} id={id} checked={checked}/>
                <span className="b-search-list-playground__label">
                    <svg viewBox="64 64 896 896" className="b-search-list-playground__icon-check" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg>
                </span>
                <div className="b-search-list-playground__content">
                    <div className="b-search-list-playground__name">{namePlayground}</div>
                    <div className="b-search-list-playground__address">{addressPlayground}</div>
                </div>
            </label>
        )
    }
}

export default SearchListPlayground;
