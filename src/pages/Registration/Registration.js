// react, redux, helpers
import React, { Component } from 'react';
import { connect } from 'react-redux';
import telWithoutPlus from '../../helpers/telWithoutPlus';
import { configPathRouter } from '../../App/configPathRouter';
import { Link } from 'react-router-dom';

// components
import Input from '../../components/ui-kit/Input/Input';
import Checkbox from '../../components/ui-kit/Checkbox/Checkbox';
import { userActions } from '../../store/actions/userAction';
import Button from '../../components/ui-kit/Button/Button';
import InputMask from 'react-input-mask';
import Preloader from '../../components/Preloader/Preloader';

// style
import '../../style/bem-blocks/b-registration/index.scss';

class Registration extends Component {
    state = {
        user: {
            first_name: '',
            last_name: '',
            phone: '', // "User phone without '+' symbol"
            password: '',
            c_password: '',
            is_trainer: '0' // "Boolean flag (0 or 1)"
        },
        validation: {
            text: '',
            fieldEmpty: false,
            confirmPassword: false,
            numberTel: 18 // Note: необходимое количество символов в номере телефона
        },
        submitted: false,
        isCheck: false
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user, validation } = this.state;
        
        // Note: Если была ошибка валидации и пользователь начинает изменять поля, то скрываем ошибку
        if (validation.text !== '') {
            this.setState({
                validation: {
                    ...validation,
                    text: ''
                }
            })
        }

        this.setState({
            user: {
                ...user,
                [name]: value
            }
        })
    }

    handleCheck = () => {
        const { user, isCheck } = this.state;
        const isTrainer = !isCheck ? '1' : '0';

        this.setState({
            user: {
                ...user,
                is_trainer: isTrainer
            },
            isCheck: !isCheck
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { user, validation } = this.state;
        const { dispatch } = this.props;

        // Note: Проверяем все ли поля заполнены
        for (let key in user) {
            if (!Boolean(user[key])) {
                this.setState({
                    validation: {
                        ...validation,
                        text: 'Все поля должны быть заполнены',
                        fieldEmpty: true
                    }
                })
                
                return false;
            }
        }

        // Note: Проверяем ввел ли пользователь достаточное количество символов для номера телефона
        // TODO: сделать такую проверку для всех стран
        if (user.phone.length !== 18) {
            this.setState({
                validation: {
                    ...validation,
                    text: 'Недостаточное количество цифр номера телефона',
                    numberTel: true
                }
            })

            return false;
        }

        // Note: Проверяем совпадают ли введённые пароли
        if (user.password !== user.c_password) {
            this.setState({
                validation: {
                    ...validation,
                    text: 'Пароли не совпадают',
                    confirmPassword: true
                }
            })

            return false;
        }

        const userRequestData = {
            ...this.state.user
        }
        // Note: Убираем символ + у номера телефона
        userRequestData.phone = telWithoutPlus(userRequestData.phone);

        // Note: Показываем, что уходит сабмит и диспатчим запрос
        this.setState({submitted: true});
        dispatch(userActions.register(userRequestData));
    }

    render() {
        const { user, validation, isCheck } = this.state;
        const { preloader } = this.props;

        return(
            <div className="b-registration">
                <div className="container">
                    <div className="b-registration__form-wrapper">
                        <form name='register-user' onSubmit={this.handleSubmit} className="b-registration__form">

                            <h1 className="b-registration__heading">Регистрация</h1>

                            {/*props { labelText?, typeInput, idInput, placeholder, value } */}
                            <Input
                                placeholder="Ваше имя"
                                typeInput="text"
                                idInput="first_name"
                                value={user.first_name}
                                onChange={this.handleChange}
                            />

                            <Input
                                placeholder="Ваша фамилия"
                                typeInput="text"
                                idInput="last_name"
                                value={user.last_name}
                                onChange={this.handleChange}
                            />

                            {/*TODO: Сделать маску для номера телефона (для разных стран) */}
                            {/* <InputMask mask="+7 (999) 999-99-99" value={user.numberTelephone} onChange={this.handleChange}>
                                {(inputProps) => <Input {...inputProps} type="tel"/>}
                            </InputMask> */}

                            <div className="b-input">
                                <InputMask className="b-input__input" id="phone" name="phone" mask="+7 (999) 999-99-99" maskChar={null} value={user.phone} onChange={this.handleChange} placeholder="Ваш номер телефона" />
                            </div>

                            <Input
                                placeholder="Пароль"
                                typeInput="password"
                                idInput="password"
                                value={user.password}
                                onChange={this.handleChange}
                            />  

                            <Input
                                placeholder="Повторите пароль"
                                typeInput="password"
                                idInput="c_password"
                                value={user.c_password}
                                onChange={this.handleChange}
                            />
                            
                            {/* { name, id, text, value, checked, modif } */}
                            <Checkbox 
                                name="is_trainer"
                                id="is_trainer"
                                text="Я тренер"
                                value="1"
                                checked={isCheck}
                                onChange={this.handleCheck}
                            />
                            
                            <div className="b-registration__button-wrapper">
                                {/* { name } */}
                                <Button
                                    modif="b-button--login"
                                    name={'Зарегистрироваться'}
                                />

                                {validation.fieldEmpty || validation.confirmPassword ?
                                    <div className="b-registration__error">{validation.text}</div>
                                    :
                                    null
                                }
                            </div>
                        </form>
                        <div className="b-registration__sub-navigation">
                            <span className="b-registration__sub-question"> У вас уже есть профиль? </span>
                            <Link to={configPathRouter.authorization}>Войти</Link>
                        </div>
                    </div>
                </div>
                {preloader 
                    ? <Preloader />
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = ({ registration }) => {
    return {
        preloader: registration.preloader
    }
}

export default connect(mapStateToProps)(Registration);