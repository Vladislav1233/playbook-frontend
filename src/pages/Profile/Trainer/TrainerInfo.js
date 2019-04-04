import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { trainerInfoService } from '../../../services/trainerInfoService';
import { Form, Field } from 'react-final-form';

// actions
import { searchPlaygroundAction, clearSearchPlayground } from '../../../store/actions/searchPlayground';
import { alertActions } from '../../../store/actions/alertAction';
import { createEquipment, getAllEquipmentsForBookable } from '../../../store/actions/equipment';

// Note: helpers
import { convertTypeMoney } from '../../../helpers/convertTypeMoney';
import textErrorFromServer from '../../../helpers/textErrorFromServer';

// Note: components
import Input from '../../../components/ui-kit/Input/Input';
import Textarea from '../../../components/ui-kit/Textarea';
import SearchListPlayground from '../../../components/SearchListPlayground';
import Button from '../../../components/ui-kit/Button/Button';
import Preloader from '../../../components/Preloader/Preloader';
import CreateAdditionalService from '../../../components/CreateAdditionalService';

// Note: styles
import '../../../style/bem-blocks/b-trainer-info/index.scss';

const LIST_ADDITIONAL_SERVICE_TENNIS = [{
    name: 'Аренда теннисной ракетки',
    id: 'tennis_racket',
    showFieldForAvailability: true
}, {
    name: 'Корзина мячей',
    id: 'tennis_ball',
    showFieldForAvailability: true
}];

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
            },
            preloader: false
        }
    }

    componentDidMount() {
        this.getTrainerInfo();
        this.props.getAllEquipmentsForBookableAction('trainer', this.props.userId);
    }

    componentWillUnmount() {
        this.props.onClearSearchPlayground();
    }

    getTrainerInfo = () => {
        const { userId } = this.props;

        if (this.state.preloader === false) {
            this.setState({ preloader: true });
        }

        trainerInfoService.getTrainerInformation(userId)
            .then(
                response => {
                    this.setState({ preloader: false });
                    if (response.data.data.uuid) {

                        const {
                            first_name,
                            last_name,
                            playgrounds,
                            trainer_info
                        } = response.data.data;

                        this.setState({
                            ...this.state,
                            idInfo: trainer_info ? trainer_info.uuid : null,
                            trainerInfo: {
                                ...this.state.trainerInfo,
                                name: first_name ? first_name : '',
                                patronymic: '', // TODO
                                surname: last_name ? last_name : '',
                                about: trainer_info ? trainer_info.about : '',
                                minPrice: trainer_info ? convertTypeMoney(trainer_info.min_price, 'RUB', 'banknote') : '',
                                maxPrice: trainer_info ? convertTypeMoney(trainer_info.max_price, 'RUB', 'banknote') : '',
                                playgrounds: playgrounds ? playgrounds : ''
                            }
                        })
                    }
                },
                error => {
                    this.setState({ preloader: false });
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
        if (value.length > 0) {
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
                return item.uuid === event.target.value && playgrounds.every(itemSome => item.uuid !== itemSome.uuid);
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
                return item.uuid !== event.target.value;
            });

            this.setState({
                ...this.state,
                trainerInfo: {
                    ...this.state.trainerInfo,
                    playgrounds: getUnCheckPlayground
                }
            })
        }
    }

    onSaveInformation = (values) => {
        if (this.state.preloader === false) {
            this.setState({ preloader: true });
        }

        let dataAdditionalService = []; 
        LIST_ADDITIONAL_SERVICE_TENNIS.forEach((serviceItem) => {
            // console.log(serviceItem)
            if(values[serviceItem.id] && values[serviceItem.id].service) {
                dataAdditionalService.push({
                    name: serviceItem.name,
                    price_per_hour: convertTypeMoney(+values[serviceItem.id].cost, 'RUB', 'coin'),
                    currency: 'RUB',
                    availability: values[serviceItem.id].availability ? values[serviceItem.id].availability : 1,
                    uuid: values[serviceItem.id].uuid ? values[serviceItem.id].uuid : undefined
                });
            }
        })
        
        dataAdditionalService.forEach((requestDataService) => {
            requestDataService.uuid ? undefined : this.props.createEquipmentAction(requestDataService);
        });


        // TODO: здесь надо будет обсудить и доделать так, чтобы найденные новые площадки не пересекались с уже добавленными себе, чтобы лишнего не выводилось тренеру. + Надо придумать как удалять площадку на которой тренируешь.
        const {
            playgrounds
        } = this.state.trainerInfo;

        const { 
            about,
            minPrice,
            maxPrice 
        } = values;

        const { idInfo } = this.state;

        const playgroundsId = playgrounds.length > 0 ? playgrounds.map(item => {
            return item.uuid;
        }) : [];

        const data = {
            playgrounds: playgroundsId,
            about,
            min_price: convertTypeMoney(minPrice, 'RUB', 'coin'),
            max_price: convertTypeMoney(maxPrice, 'RUB', 'coin'),
            currency: "RUB"
        };

        if (idInfo) {
            trainerInfoService.editTrainerInformation(idInfo, data)
                .then(
                    res => {
                        this.setState({ preloader: false });
                        this.props.dispatch(alertActions.success('Успешно сохранено!'));
                    },
                    err => {
                        this.setState({ preloader: false });
                        this.props.dispatch(alertActions.error(`Ошибка! ${textErrorFromServer(err)}`));
                    }
                );
        } else {
            trainerInfoService.createTrainerInformation(data)
                .then(
                    res => {
                        this.setState({ preloader: false });
                        this.props.dispatch(alertActions.success('Успешно сохранено!'));
                    },
                    err => {
                        this.setState({ preloader: false });
                        this.props.dispatch(alertActions.error(`Ошибка! ${textErrorFromServer(err)}`));
                    }
                );
        }
    };

    render() {
        const { trainerInfo, preloader } = this.state;
        const { foundPlagrounds, equipment } = this.props;

        let additionalServiceRender = {};
        if(equipment.length > 0) {
            equipment.forEach((equipmentItem) => {
                LIST_ADDITIONAL_SERVICE_TENNIS.forEach(_additionalService => {
                    if(_additionalService.name === equipmentItem.name) {
                        additionalServiceRender[_additionalService.id] = {
                            service: true,
                            cost: convertTypeMoney(equipmentItem.price_per_hour, 'RUB', 'banknote'),
                            availability: equipmentItem.availability,
                            uuid: equipmentItem.uuid
                        }
                    }
                });
            });
        };
        console.log(equipment);
        console.log(additionalServiceRender)
        console.log(trainerInfo)

        

        return (
            <Form 
                onSubmit={this.onSaveInformation}
                initialValues={{
                    ...trainerInfo,
                    ...additionalServiceRender
                }}
                render={({ handleSubmit, values }) => {
                    console.log(values)
                    return <form onSubmit={handleSubmit} className="b-trainer-info">
                        <h1>Настройка личного профиля</h1>
                        <div className="b-trainer-info__info-wrap">
                            <div className="b-trainer-info__form">
                                <Field 
                                    name='name'
                                    render={({ input }) => {
                                        return <Input
                                            { ...input }
                                            labelText="Имя"
                                            idInput="profile_name"
                                            nameInput={input.name}
                                            placeholder="Имя"
                                            theme={{ blackColor: true }}
                                            disabled
                                        />
                                    }}
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
                                
                                <Field 
                                    name='surname'
                                    render={({ input }) => {
                                        return <Input
                                            { ...input }
                                            labelText="Фамилия"
                                            idInput="profile_surname"
                                            nameInput={input.name}
                                            placeholder="Фамилия"
                                            theme={{ blackColor: true }}
                                            disabled
                                        />
                                    }}
                                />
                                
                                <Field 
                                    name="about"
                                    render={({ input }) => {
                                        return <Textarea
                                            { ...input }
                                            labelText="О себе"
                                            idInput="profile_about"
                                            nameInput={input.name}
                                            placeholder="Поле для дополнительной информации"
                                            theme={{ blackColor: true }}
                                        />
                                    }}
                                />
                            </div>
        
                            <div className="b-trainer-info__playground">
                                <div className="b-trainer-info__cost">
                                    <div className="b-trainer-info__title-field">Стоимость часа, ₽</div>
                                    
                                    <Field 
                                        name="minPrice"
                                        render={({ input }) => {
                                            return <Input
                                                { ...input }
                                                idInput="profile_minPrice"
                                                nameInput={input.name}
                                                placeholder="Минимальная"
                                                theme={{ blackColor: true }}
                                                modif="b-input--time-booking"
                                                typeInput="number"
                                            />
                                        }}
                                    />
                                    
                                    <Field 
                                        name="maxPrice"
                                        render={({ input }) => {
                                            return <Input
                                                { ...input }
                                                idInput="profile_maxPrice"
                                                nameInput={input.name}
                                                placeholder="Максимальная"
                                                theme={{ blackColor: true }}
                                                modif="b-input--time-booking"
                                                typeInput="number"
                                            />
                                        }}
                                    />
                                </div>
                                
                                <CreateAdditionalService 
                                    listAdditionalService={LIST_ADDITIONAL_SERVICE_TENNIS}
                                    onChangeField={this.handleAdditionalService}
                                />
        
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
                                    theme={{ blackColor: true }}
                                    autoComplete={false}
                                />
        
                                {foundPlagrounds.length > 0 ?
                                    <Fragment>
                                        <div className="b-trainer-info__title-field b-trainer-info__title-field--light">Найденные площадки:</div>
                                        <ul className='b-trainer-info__playground-list'>
                                            {foundPlagrounds.map(item => {
                                                return (
                                                    <li key={item.uuid} className="b-trainer-info__playground-item">
                                                        <SearchListPlayground
                                                            id={`search_${item.uuid}`}
                                                            namePlayground={item.name}
                                                            addressPlayground={item.address}
                                                            onChange={this.handlePlayground}
                                                            value={item.uuid}
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
                                        <div className="b-trainer-info__title-field b-trainer-info__title-field--light">Добавленные площадки:</div>
                                        <ul className='b-trainer-info__playground-list'>
                                            {trainerInfo.playgrounds.map(item => {
                                                return (
                                                    <li key={item.uuid} className="b-trainer-info__playground-item">
                                                        <SearchListPlayground
                                                            id={`work_${item.uuid}`}
                                                            namePlayground={item.name}
                                                            addressPlayground={item.address}
                                                            disabled
                                                            checked
                                                            value={item.uuid}
                                                            onChange={this.handlePlayground}
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
                        </div>
                        <div className="b-trainer-info__button">
                            <Button type="submit">Сохранить</Button>
                        </div>
        
                        {preloader ? <Preloader /> : null}
                    </form>
                }}
            />
        )
    }
}

const mapStateToProps = ({ searchPlayground, identificate, equipment }) => {
    return {
        foundPlagrounds: searchPlayground.playgrounds,
        userId: identificate.userId,
        equipment: equipment.equipments
    }
}

const mapStateToDispatch = dispatch => {
    return {
        searchPlayground: (data) => dispatch(searchPlaygroundAction(data)),
        onClearSearchPlayground: () => dispatch(clearSearchPlayground()),
        createEquipmentAction: (data) => dispatch(createEquipment(data)),
        getAllEquipmentsForBookableAction: (bookable_type, bookable_uuid) => dispatch(getAllEquipmentsForBookable(bookable_type, bookable_uuid)),
        dispatch: (action) => dispatch(action)
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(TrainerInfo);
