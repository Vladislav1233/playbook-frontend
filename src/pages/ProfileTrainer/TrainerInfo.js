import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { searchPlayground } from '../../store/actions/searchPlayground';
import { trainerInfoService } from '../../services/trainerInfoService';

// Note: components
import Input from '../../components/ui-kit/Input/Input';
import Textarea from '../../components/ui-kit/Textarea';
import SearchListPlayground from '../../components/SearchListPlayground';
import Button from '../../components/ui-kit/Button/Button';

class TrainerInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trainerInfo: {
                name: '',
                patronymic: '',
                surname: '',
                about: '',
                minPrice: '',
                maxPrice: '',
                searchCourt: '',
                playgrounds: []
            },
            playgroundsWorkAdd: []
        }
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        trainerInfoService.getTrainerInformation(userId)
            .then(
                response => {
                    const { 
                        about,
                        min_price,
                        max_price,
                        playgrounds,
                        user
                    } = response.data.data;

                    this.setState({
                        ...this.state,
                        trainerInfo: {
                            ...this.state.trainerInfo,
                            name: user.first_name,
                            patronymic: '', // TODO
                            surname: user.last_name,
                            about,
                            minPrice: min_price,
                            maxPrice: max_price,
                            playgrounds: playgrounds
                        }
                    })
                },
                error => {
                    alert(error);
                }
            )
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

    // Note: По клику найденный корт добавлять его в массив с кортами на которых работаешь или удалять
    handlePlayground = (event) => {

        if (event.target.checked) {
            const getCheckPlayground = this.props.foundPlagrounds.filter(item => {
                return item.id === +event.target.value;
            });
            this.setState({
                ...this.state,
                playgroundsWorkAdd: this.state.playgroundsWorkAdd.concat(getCheckPlayground)
            })
        } else {

        };
    }

    onSaveInformation = () => {
        // TODO: здесь надо будет обсудить и доделать так, чтобы найденные новые площадки не пересекались с уже добавленными себе, чтобы лишнего не выводилось тренеру. + Надо придумать как удалять площадку на которой тренируешь.
        const { playgroundsWorkAdd } = this.state;
        const { 
            playgrounds,
            about,
            minPrice,
            maxPrice
        } = this.state.trainerInfo;

        const playgroundsId = playgrounds.length > 0 ? playgrounds.map(item => {
            return item.id;
        }) : [];
        const playgroundsWorkAddId = playgroundsWorkAdd.length > 0 ? playgroundsWorkAdd.map(item => {
            return item.id;
        }) : [];

        const data = {
            playgrounds: [...playgroundsWorkAddId, ...playgroundsId],
            about,
            min_price: minPrice,
            max_price: maxPrice,
            currency: "RUB"
        };

        trainerInfoService.postTrainerInformation(data);
    }

    render() {
        // const { labelText, typeInput, idInput, placeholder, value, nameInput, modif, theme } = this.props;
        const { trainerInfo } = this.state;
        const { foundPlagrounds } = this.props;

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
                        <Fragment>
                            <div>Список найденных кортов</div>
                            <ul className='b-trainer-info__playground-list'>
                                {foundPlagrounds.map(item => {
                                    return(
                                        <li key={item.id} className="b-trainer-info__playground-item">
                                            <SearchListPlayground 
                                                id={`search_${item.id}`}
                                                namePlayground={item.name}
                                                addressPlayground={item.address}
                                                onChange={this.handlePlayground}
                                                value={item.id}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </Fragment>
                        :
                        null
                    }

                    {trainerInfo.playgrounds.length > 0 ?
                        <Fragment>
                            <div>Корты, на которых работаю</div>
                            <ul className='b-trainer-info__playground-list'>
                                {trainerInfo.playgrounds.map(item => {
                                    return(
                                        <li key={item.id} className="b-trainer-info__playground-item">
                                            <SearchListPlayground
                                                id={`work_${item.id}`}
                                                namePlayground={item.name}
                                                addressPlayground={item.address}
                                                disabled
                                                value={item.id}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </Fragment>
                        :
                        null
                    }

                </div>
                <Button 
                    name="Сохранить"
                    onClick={this.onSaveInformation}
                />
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