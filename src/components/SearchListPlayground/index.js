import React, { Component } from 'react';

class SearchListPlayground extends Component {
    render() {
        const { namePlayground, addressPlayground, disabled, onChange, id, value } = this.props;

        return(
            <div className="b-search-list-playground">
                <input value={value} type='checkbox' className="b-search-list-playground__input" onChange={onChange} disabled={disabled} id={id}/>
                <label className="b-search-list-playground__label"></label>
                <div className="b-search-list-playground__name">{namePlayground}</div>
                <div className="b-search-list-playground__address">{addressPlayground}</div>
            </div>
        )
    }
}

export default SearchListPlayground;
