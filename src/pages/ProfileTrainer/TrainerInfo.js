import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { searchPlayground, clearSearchPlayground } from '../../store/actions/searchPlayground';
import { trainerInfoService } from '../../services/trainerInfoService';

// Note: components
import Input from '../../components/ui-kit/Input/Input';
import Textarea from '../../components/ui-kit/Textarea';
import SearchListPlayground from '../../components/SearchListPlayground';
import Button from '../../components/ui-kit/Button/Button';

// Note: styles
import '../../style/bem-blocks/b-trainer-info/index.scss';

class TrainerInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            idInfo: null,
            trainerInfo: {
                name: '',
                patronymic: '',
                surname: '',
                about: '',
                minPrice: '',
                maxPrice: '',
                searchCourt: '',
                playgrounds: []
            }
        }
    }

    componentDidMount() {
        this.getTrainerInfo();
    };

    getTrainerInfo = () => {
        const userId = localStorage.getItem('userId');
        trainerInfoService.getTrainerInformation(userId)
            .then(
                response => {
                    if(response.data.data.id) {
                        const { 
                            about,
                            min_price,
                            max_price,
                            playgrounds,
                            user,
                            id
                        } = response.data.data;

                        this.setState({
                            ...this.state,
                            idInfo: id,
                            trainerInfo: {
                                ...this.state.trainerInfo,
                                name: user ? user.first_name : '',
                                patronymic: '', // TODO
                                surname: user ? user.last_name : '',
                                about: about ? about : '',
                                minPrice: min_price ? min_price : '',
                                maxPrice: max_price ? max_price : '',
                                playgrounds: playgrounds ? playgrounds : ''
                            }
                        })
                    }
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
            ...this.state,
            trainerInfo: {
                ...trainerInfo,
                [name]: value
            }
        })
    }

    onSearchCourt = (event) => {
        const { value } = event.target; 
        const { searchPlayground, onClearSearchPlayground } = this.props;

        let data = {
            query: value
        };
        
        // TODO: Сделать, что запрос будет отправляться после ввода трёх символов. + подсказку в поле, что нужно больше 3-х символов.
        if(value.length > 0) {
            searchPlayground(data);
        } else {
            onClearSearchPlayground();
        }
    }

    // Note: По клику найденный корт добавлять его в массив с кортами на которых работаешь или удалять
    handlePlayground = (event) => {

        const { playgrounds } = this.state.trainerInfo;

        if (event.target.checked) {
            const getCheckPlayground = this.props.foundPlagrounds.filter(item => {
                return item.id === +event.target.value && playgrounds.every(itemSome =>  item.id !== itemSome.id);
            });

            this.setState({
                ...this.state,
                trainerInfo: {
                    ...this.state.trainerInfo,
                    playgrounds: playgrounds.concat(getCheckPlayground)
                }
            })
        } else {
            const getUnCheckPlayground = playgrounds.filter(item => {
                return item.id !== +event.target.value;
            });

            this.setState({
                ...this.state,
                trainerInfo: {
                    ...this.state.trainerInfo,
                    playgrounds: getUnCheckPlayground
                }
            })
        };
    }

    onSaveInformation = () => {
        // TODO: здесь надо будет обсудить и доделать так, чтобы найденные новые площадки не пересекались с уже добавленными себе, чтобы лишнего не выводилось тренеру. + Надо придумать как удалять площадку на которой тренируешь.
        const { 
            playgrounds,
            about,
            minPrice,
            maxPrice
        } = this.state.trainerInfo;

        const { idInfo } = this.state;

        const playgroundsId = playgrounds.length > 0 ? playgrounds.map(item => {
            return item.id;
        }) : [];

        const data = {
            playgrounds: playgroundsId,
            about,
            min_price: minPrice,
            max_price: maxPrice,
            currency: "RUB"
        };
        console.log(idInfo);

        if (idInfo) {
            trainerInfoService.editTrainerInformation(idInfo, data);
        } else {
            trainerInfoService.createTrainerInformation(data);
        }
    }

    render() {
        // const { labelText, typeInput, idInput, placeholder, value, nameInput, modif, theme } = this.props;
        const { trainerInfo } = this.state;
        const { foundPlagrounds } = this.props;
        console.log(this.state);

        return(
            <div className="b-trainer-info">
                <div className="b-trainer-info__form">
                    <Input 
                        labelText="Имя"
                        idInput="profile_name"
                        nameInput="name"
                        placeholder="Имя"
                        value={trainerInfo.name}
                        onChange={e => this.handleChangeInput(e)}
                        theme={{blackColor: true}}
                    />

                    {/* <Input 
                        labelText="Отчество"
                        idInput="profile_patronymic"
                        nameInput="patronymic"
                        placeholder="Отчество"
                        value={trainerInfo.patronymic}
                        onChange={e => this.handleChangeInput(e)}
                        theme={{blackColor: true}}
                    /> */}

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

                        <Input
                            idInput="profile_minPrice"
                            nameInput="minPrice"
                            placeholder="Минимальная"
                            value={trainerInfo.minPrice}
                            onChange={e => this.handleChangeInput(e)}
                            theme={{blackColor: true}}
                            modif="b-input--time-booking"
                        />
                        <Input
                            idInput="profile_maxPrice"
                            nameInput="maxPrice"
                            placeholder="Максимальная"
                            value={trainerInfo.maxPrice}
                            onChange={e => this.handleChangeInput(e)}
                            theme={{blackColor: true}}
                            modif="b-input--time-booking"
                        />
                    </div>
                </div>

                <div className="b-trainer-info__playground">
                        <div className="b-trainer-info__title-field">Выбор площадок, на которых вы тренируете</div>
                        <Input
                            idInput="profile_search-court"
                            nameInput="searchCourt"
                            placeholder="Введите название или адрес"
                            value={trainerInfo.searchCourt}
                            onChange={e => {
                                this.handleChangeInput(e);
                                this.onSearchCourt(e);
                            }}
                            theme={{blackColor: true}}
                        />
                        
                        {foundPlagrounds.length > 0 ?
                            <Fragment>
                                <div className="b-trainer-info__title-field b-trainer-info__title-field--light">Найденные площадки</div>
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
                                                    hover
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
                                <div className="b-trainer-info__title-field b-trainer-info__title-field--light">Добавленные площадки</div>
                                <ul className='b-trainer-info__playground-list'>
                                    {trainerInfo.playgrounds.map(item => {
                                        return(
                                            <li key={item.id} className="b-trainer-info__playground-item">
                                                <SearchListPlayground
                                                    id={`work_${item.id}`}
                                                    namePlayground={item.name}
                                                    addressPlayground={item.address}
                                                    disabled
                                                    checked
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

                    <div className="b-trainer-info__button">
                        <Button 
                            name="Сохранить"
                            onClick={this.onSaveInformation}
                        />
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
        searchPlayground: (data) => dispatch(searchPlayground(data)),
        onClearSearchPlayground: () => dispatch(clearSearchPlayground()) 
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(TrainerInfo);