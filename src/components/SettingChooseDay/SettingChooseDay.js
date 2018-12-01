import React, { Component } from 'react';
import Select from 'react-select';

const optionsSelect = [{
    value: 'one',
    label: 'Один день'
}, {
    value: 'multiple',
    label: 'Несколько дней'
}, {
    value: 'period',
    label: 'Период (от - до)'
}, {
    value: 'weekdays',
    label: 'Все будние дни месяца'
}, {
    value: 'weekends',
    label: 'Все выходные дни месяца'
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
                <span>Выбрать на календаре:</span>

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
