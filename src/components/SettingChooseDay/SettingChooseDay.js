import React, { Component } from 'react';
import Select from 'react-select';

// Note: style
import '../../style/bem-blocks/b-setting-choose-day/index.scss';

const optionsSelect = [{
    value: 'one',
    label: 'Один день'
}, {
    value: 'period',
    label: 'Период (от - до)'
}]

class SettingChooseDay extends Component {
    state = {
        selectedOption: optionsSelect[0]
    }

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption
        });
    }

    render() {
        return (
            <div className="b-setting-choose-day">
                <span className="b-setting-choose-day__title">Выбрать на календаре:</span>

                <div className="b-setting-choose-day__select">
                    <Select
                        value={this.state.selectedOption}
                        options={optionsSelect}
                        onChange={this.handleChange}
                        isSearchable={false}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: '#55bc96',
                                primary: '#ffb72d',
                                neutral20: '#ccc'
                            }
                        })}
                    />
                </div>
            </div>
        )
    }
}

export default SettingChooseDay;
