import React, { Component } from 'react';

class SearchListPlayground extends Component {
    render() {
        const { namePlayground, addressPlayground } = this.props;

        return(
            <div className="b-search-list-playground">
                <input type='checkbox' className="b-search-list-playground__input" />
                <label className="b-search-list-playground__label"></label>
                <div className="b-search-list-playground__name">{namePlayground}</div>
                <div className="b-search-list-playground__address">{addressPlayground}</div>
            </div>
        )
    }
}

export default SearchListPlayground;
