import React, { Component } from 'react';
import Select from 'react-select';

// Note: style
import '../../style/bem-blocks/b-setting-choose-day/index.scss';

class SettingChooseDay extends Component {

    static defaultProps = {
        optionsSelect: []
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: props.optionsSelect[0]
        }
    }

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption
        });

        this.props.getValueSelect(selectedOption);
    }

    render() {
        const { optionsSelect } = this.props;

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
                                primary25: 'rgba(0, 0, 0, 0.1)',
                                primary: '#0b4e35',
                                neutral20: '#0b4e35'
                            }
                        })}
                        {...this.props}
                    />
                </div>
            </div>
        )
    }
}

export default SettingChooseDay;
