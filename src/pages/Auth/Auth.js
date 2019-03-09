import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../store/actions/userAction';
import { Link } from 'react-router-dom';
import { configPathRouter } from '../../App/configPathRouter';
import telWithoutPlus from '../../helpers/telWithoutPlus';

// components
import Input from '../../components/ui-kit/Input/Input';
import Button from '../../components/ui-kit/Button/Button';
import InputMask from 'react-input-mask';
import Preloader from '../../components/Preloader/Preloader';

class Auth extends Component {
    state = {
        user: {
            phone: '',
            password: ''
        },
        validation: {
            text: '',
            fieldEmpty: false,
            numberTel: 18 // Note: необходимое количество символов в номере телефона
        },
        submitted: false
    }

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

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { phone, password } = this.state.user;
        const { dispatch } = this.props;

        // Note: Проверяем все ли поля заполнены
        for (let key in this.state.user) {
            if (!Boolean(this.state.user[key])) {
                this.setState({
                    validation: {
                        ...this.state.validation,
                        text: 'Все поля должны быть заполнены',
                        fieldEmpty: true
                    }
                })
                
                return false;
            }
        };

        if (phone && password) {
            const dataRequest = {
                phone,
                password
            }

            // Note: Убираем символ + у номера телефона
            dataRequest.phone = telWithoutPlus(dataRequest.phone);
            // Note: Диспатчим запрос
            dispatch(userActions.login(dataRequest));
        };
    }

    render() {
        const { user, validation} = this.state;
        const { preloader } = this.props;

        return (
            <div className="b-registration">
                <div className="container">
                    <div className="b-registration__form-wrapper">
                        <form className="b-registration__form" name="authorization" onSubmit={this.handleSubmit}>

                            <h1 className="b-registration__heading">Авторизация</h1>

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

                            <div className="b-registration__button-wrapper">
                                {/* { name } */}
                                <Button
                                    modif="b-button--login"
                                    name={'Войти'}
                                />

                                {validation.fieldEmpty || validation.confirmPassword ?
                                    <div className="b-registration__error">{validation.text}</div>
                                    :
                                    null
                                }
                            </div>
                        </form>

                        <div className="b-registration__sub-navigation">
                            <span className="b-registration__sub-question">У вас ещё нет профиля? </span>
                            <Link to={configPathRouter.registration}>Зарегистрироваться</Link>
                        </div>
                    </div>
                </div>
                { preloader 
                    ? <Preloader />
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = ({ identificate }) => {
    return {
        preloader: identificate.preloader
    }
}

export default connect(mapStateToProps, null)(Auth);
