// react, redux, helpers
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { configPathRouter } from '../../App/configPathRouter';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

// components
import Input from '../../components/ui-kit/Input/Input';
import Checkbox from '../../components/ui-kit/Checkbox/Checkbox';
import { userActions } from '../../store/actions/userAction';
import Button from '../../components/ui-kit/Button/Button';
import InputMask from 'react-input-mask';
import Preloader from '../../components/Preloader/Preloader';

// helpers
import { composeValidators, required, confirmPassword, fullTelNumber } from '../../helpers/validate';
import telWithoutPlus from '../../helpers/telWithoutPlus';

// style
import '../../style/bem-blocks/b-registration/index.scss';
import bgSrcs from '../../style/images/login-bg/images.js';

const randomIndexBg = Math.round(Math.random() * (bgSrcs.length - 1));
const randomBg = bgSrcs[randomIndexBg];

class Registration extends Component {

  handleSubmit = (values) => {
    const { dispatch } = this.props;

    const userRequestData = {
      ...values,
      is_trainer: values.is_trainer ? 1 : 0,
      phone: telWithoutPlus(values.phone)
    };
    dispatch(userActions.register(userRequestData));
  }

  render() {
    const { preloader } = this.props;

    return (
      <div className="b-registration">
        <img className="b-registration__bg" alt="" src={randomBg} importance="high" />
        <div className="container">
          <div className="b-registration__form-wrapper">
            <Form
              onSubmit={this.handleSubmit}
              render={({ handleSubmit }) => {
                return <form name='register-user' onSubmit={handleSubmit} className="b-registration__form">
                  <h1 className="b-registration__heading">Регистрация</h1>

                  <Field
                    name="first_name"
                    validate={required()}
                    render={({ input, meta }) => {
                      return <Input
                        {...input}
                        nameInput={input.name}
                        placeholder="Ваше имя"
                        typeInput="text"
                        idInput="first_name"
                        error={meta.error && meta.touched ? meta.error : null}
                      />
                    }}
                  />

                  <Field
                    name="last_name"
                    validate={required()}
                    render={({ input, meta }) => {
                      return <Input
                        {...input}
                        placeholder="Ваша фамилия"
                        typeInput="text"
                        idInput="last_name"
                        nameInput={input.name}
                        error={meta.error && meta.touched ? meta.error : null}
                      />
                    }}
                  />

                  {/*TODO: Сделать маску для номера телефона (для разных стран) */}
                  <Field
                    name="phone"
                    validate={composeValidators(
                      required(),
                      fullTelNumber(18)
                    )}
                    render={({ input, meta }) => {
                      return <div className={
                        meta.error && meta.touched
                          ? "b-input error"
                          : "b-input"}
                      >
                        <InputMask
                          className="b-input__input"
                          id="phone"
                          mask="+9 (999) 999-99-99"
                          maskChar={null}
                          placeholder="Ваш номер телефона"
                          type="tel"
                          {...input}
                        />
                        {meta.error && meta.touched
                          ? <div className='b-input__error'>{meta.error}</div>
                          : null
                        }
                      </div>
                    }}
                  />

                  <Field
                    name="password"
                    validate={required()}
                    render={({ input, meta }) => {
                      return <Input
                        {...input}
                        placeholder="Пароль"
                        typeInput="password"
                        idInput="password"
                        nameInput={input.name}
                        error={meta.error && meta.touched ? meta.error : null}
                      />
                    }}
                  />

                  <Field
                    name="c_password"
                    validate={(value, allValues) => composeValidators(
                      required(),
                      confirmPassword(allValues.password)
                    )(value)
                    }
                    render={({ input, meta }) => {
                      return <Input
                        {...input}
                        placeholder="Повторите пароль"
                        typeInput="password"
                        idInput="c_password"
                        nameInput={input.name}
                        error={meta.error && meta.touched ? meta.error : null}
                      />
                    }}
                  />

                  {/* { name, id, text, value, checked, modif } */}
                  <Field
                    name="is_trainer"
                    type='checkbox'
                    render={({ input }) => {
                      return <Checkbox
                        {...input}
                        id="is_trainer"
                        value="1"
                        modif="b-checkbox--white"
                      >
                        <span>Я тренер</span>
                      </Checkbox>
                    }}
                  />

                  <div className="b-registration__button-wrapper">
                    <Button
                      type='submit'
                      modif="b-button--login"
                      name='Зарегистрироваться'
                    />
                  </div>

                  <Field
                    name="is_confirm-personal"
                    type='checkbox'
                    validate={required('Ваше согласие обязательно')}
                    render={({ input, meta }) => {
                      return <Checkbox
                        {...input}
                        id="is_confirm-personal"
                        modif="b-checkbox--white b-checkbox--align-top b-checkbox--agreement"
                        error={meta.error && meta.touched ? meta.error : null}
                      >
                        <span>Я принимаю условия <a href="/agreement" title="пользовательское соглашение" target="blank"> соглашения</a></span>
                      </Checkbox>
                    }}
                  />
                </form>
              }}
            />

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