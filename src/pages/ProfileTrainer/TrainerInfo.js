import React, { Component } from 'react';
import { connect } from "react-redux";
import { searchPlayground } from '../../store/actions/searchPlayground';

// Note: components
import Input from '../../components/ui-kit/Input/Input';
import Textarea from '../../components/ui-kit/Textarea';
import SearchListPlayground from '../../components/SearchListPlayground';

class TrainerInfo extends Component {

    state = {
        trainerInfo: {
            name: '',
            patronymic: '',
            surname: '',
            about: '',
            minPrice: '',
            maxPrice: '',
            searchCourt: ''
        }
    }

    handleChangeInput = (event) => {
        const { name, value } = event.target;
        const { trainerInfo } = this.state;

        this.setState({
            trainerInfo: {
                ...trainerInfo,
                [name]: value
            }
        })
    }

    onSearchCourt = (event) => {
        const { value } = event.target; 
        let data = {
            query: value
        };
        // TODO: Сделать, что запрос будет отправляться после ввода трёх символов. + подсказку в поле, что нужно больше 3-х символов.
        this.props.searchPlayground(data);
    }

    render() {
        // const { labelText, typeInput, idInput, placeholder, value, nameInput, modif, theme } = this.props;
        const { trainerInfo } = this.state;
        const { foundPlagrounds } = this.props;
        console.log(foundPlagrounds);

        return(
            <div className="b-trainer-info">
                
                <Input 
                    labelText="Имя"
                    idInput="profile_name"
                    nameInput="name"
                    placeholder="Имя"
                    value={trainerInfo.name}
                    onChange={e => this.handleChangeInput(e)}
                    theme={{blackColor: true}}
                />

                <Input 
                    labelText="Отчество"
                    idInput="profile_patronymic"
                    nameInput="patronymic"
                    placeholder="Отчество"
                    value={trainerInfo.patronymic}
                    onChange={e => this.handleChangeInput(e)}
                    theme={{blackColor: true}}
                />

                <Input 
                    labelText="Фамилия"
                    idInput="profile_surname"
                    nameInput="surname"
                    placeholder="Фамилия"
                    value={trainerInfo.surname}
                    onChange={e => this.handleChangeInput(e)}
                    theme={{blackColor: true}}
                />

                <Textarea
                    typeInput=""
                    labelText="О себе"
                    idInput="profile_about"
                    nameInput="about"
                    placeholder="О себе"
                    value={trainerInfo.about}
                    onChange={e => this.handleChangeInput(e)}
                    theme={{blackColor: true}}
                />

                <div className="b-trainer-info__cost">
                    <div className="b-trainer-info__title-field">Стоимость часа</div>

                    <div className="b-trainer-info__cost-field">
                        <Input
                            idInput="profile_min-price"
                            nameInput="min-price"
                            placeholder="Минимальная"
                            value={trainerInfo.minPrice}
                            onChange={e => this.handleChangeInput(e)}
                            theme={{blackColor: true}}
                        />
                    </div>
                    <div className="b-trainer-info__cost-field">
                        <Input
                            idInput="profile_max-price"
                            nameInput="max-price"
                            placeholder="Максимальная"
                            value={trainerInfo.maxPrice}
                            onChange={e => this.handleChangeInput(e)}
                            theme={{blackColor: true}}
                        />
                    </div>
                </div>

                <div className="b-trainer-info__playground">
                    <div className="b-trainer-info__title-field">Список кортов, на которых вы тренируете</div>
                    <Input
                        idInput="profile_search-court"
                        nameInput="searchCourt"
                        placeholder="Поиск корта"
                        value={trainerInfo.searchCourt}
                        onChange={e => {
                            this.handleChangeInput(e);
                            this.onSearchCourt(e);
                        }}
                        theme={{blackColor: true}}
                    />
                    
                    {foundPlagrounds.length > 0 ?
                        <ul className='b-trainer-info__playground-list'>
                            {foundPlagrounds.map(item => {
                                return(
                                    <li key={item.id} className="b-trainer-info__playground-item">
                                        <SearchListPlayground 
                                            namePlayground={item.name}
                                            addressPlayground={item.address}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ searchPlayground }) => {
    return {
        foundPlagrounds: searchPlayground.playgrounds
    }
}

const mapStateToDispatch = dispatch => {
    return {
        searchPlayground: (data) => dispatch(searchPlayground(data))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(TrainerInfo);