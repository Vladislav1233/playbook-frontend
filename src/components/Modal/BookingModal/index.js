import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import cn from 'classnames';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

// constants
import { ANALIZE_DATE_TIME_ZONE } from '../../../store/constants/formatDates';
import { ENVIRONMENT } from '../../../store/constants/restAPI';

// Note: action
import { createBooking } from '../../../store/actions/booking';
import { userActions } from '../../../store/actions/userAction';
import { getAllEquipmentsForBookable } from '../../../store/actions/equipment';

// Note: components
import Input from '../../ui-kit/Input/Input';
import TimeField from '../../ui-kit/TimeField';
import InputMask from 'react-input-mask';
import Button from '../../ui-kit/Button/Button';
import ModalComponent from '../index';
import Radio from '../../ui-kit/Radio';
import Checkbox from '../../ui-kit/Checkbox/Checkbox';
import MoneyFromat from '../../ui-kit/MoneyFormat';

// Note: services
import { userService } from '../../../services/userService';

// Note: helpers
import telWithoutPlus from '../../../helpers/telWithoutPlus';
import calcCostService from '../../../helpers/calcCostService';
import { required, startTimeBeforeEndTime, rangeContainsDate, composeValidators, validFormatTime, fullTelNumber, negativeNumber } from '../../../helpers/validate';
import { stepTime } from '../../../helpers/manipulateTime';
import { convertTypeMoney } from '../../../helpers/convertTypeMoney';
import { isEmptyObject } from '../../../helpers/isEmptyObject';

// Note: styles
import '../../../style/bem-blocks/b-booking-form/index.scss';
import '../../../style/bem-blocks/b-cost-information/index.scss';

const Moment = extendMoment(moment);
class BookingModal extends Component {
	static defaultProps = {
		stepMinIncrement: 5
	};

	constructor(props) {
		super(props);

		this.state = {
			playgroundId: null,
			registeredNewUser: false,
			showFileldPassword: false,
			costAdditionalService: {}
		};

		this.initialState = this.state;
	}

	componentDidMount() {
		this.props.getAllEquipmentsForBookableAction('trainer', this.props.userId)
	};

	onRegisterUser = ({ first_name, last_name, phone }) => {

		const dataRegister = {
			first_name,
			last_name,
			phone: telWithoutPlus(phone),
			is_trainer: 0
		};
		userService.register(dataRegister)
			.then(
				res => {
					this.setState({
						registeredNewUser: true,
						showFileldPassword: true
					});
					localStorage.setItem('userToken', res.access_token);
					if(process.env.NODE_ENV === ENVIRONMENT.development) {
						alert(`Пароль: ${res.verification_code}`)
					}
				},
				err => {
					if(err.response.data.data.phone && err.response.data.data.phone[0] === "Такое значение поля мобильный номер уже существует.") {
						this.setState({
							registeredNewUser: false,
							showFileldPassword: true
						});
					}
				}
			);
	};

	onCancel = (e) => {
		if(e) {
			e.preventDefault();
		}

		this.props.closeModal();

		this.setState({
			...this.initialState
		});

		if (!localStorage.getItem('userRole') && localStorage.getItem('userToken')) {
			localStorage.removeItem('userToken');
		}
	};

	onSubmitBooking = (values) => {
		const { typeBooking, dateBooking, createBooking, isAuthorization, loginAction, userId } = this.props;
		const { start_time, end_time, playground, players_count, equipments } = values;
		const playgroundId = playground === 'playground_other' ? null : playground;

		const formatDate = 'YYYY-MM-DD HH:mm:ss';

		// Note: Собираем данные для бронирования дополнительных услуг
		const dataEquipments = [];
		for (let key in equipments) {
			if(Object.prototype.hasOwnProperty.call(equipments, key)) {
				dataEquipments.push({
					uuid: key,
					count: equipments[key]
				})
			}
		};

		/* Note: data - Формируем данные для запроса бронирования
		* В запросе данные даты и времени переводим в UTC формат.
		*/
		const data = {
			start_time: moment(`${dateBooking} ${start_time}:00`).utc().format(formatDate),
			end_time: moment(`${dateBooking} ${end_time}:00`).utc().format(formatDate),
			bookable_uuid: userId,
			players_count,
			equipments: dataEquipments
		};

		if (playgroundId) {
			data.playground_uuid = playgroundId
		}

		if(isAuthorization) {
			createBooking(typeBooking, data);
			this.onCancel();
		} else {
			const dataLogin = {
				phone: telWithoutPlus(values.phone),
				password: values.password
			};
			loginAction(dataLogin, false, () => {
				createBooking(typeBooking, data);
				this.onCancel();
			}).then(() => { this.onCancel(); });
		}
	};

	getCostPlaygroundForPayBooking = () => {
		const { playgroundsForTraining } = this.props;
		const { playgroundId } = this.state;
		let schedulePlayground = [];
		let costPlaygroundInRange = [];

		playgroundsForTraining.forEach(playgroundForTraining => {
			// eslint-disable-next-line
			if (playgroundForTraining.uuid === playgroundId) {
				schedulePlayground = [ ...playgroundForTraining.schedules ]
			}
		});

		if (schedulePlayground.length > 0) {
			schedulePlayground.forEach(schedulePlaygroundItem => {
				// TODO: проверить как будет работать дата в ios устройствах.
				const timeRangeCost = moment.range(
					schedulePlaygroundItem.start_time,
					schedulePlaygroundItem.end_time
				);
				costPlaygroundInRange.push({
					time: timeRangeCost,
					cost: schedulePlaygroundItem.price_per_hour
				});
			})
		}

		return costPlaygroundInRange;
	};

	render() {
		const {
			isOpenModal,
			closeModal,
			playgroundsForTraining,
			isAuthorization,
			dateBooking,
			resetPasswordRequest,
			startTime,
			endTime,
			stepMinIncrement,
			equipments
		} = this.props;

		const {
			playgroundId,
			showFileldPassword,
			registeredNewUser,
			costAdditionalService
		} = this.state;

		// Note: Доступный диапазон бронирования времени в данной карточке.
		const availableRange = {
			startTime: moment(startTime, ANALIZE_DATE_TIME_ZONE).format('HH:mm'),
			endTime: moment(endTime, ANALIZE_DATE_TIME_ZONE).format('HH:mm')
		};

		let costPlaygroundForPayBooking = [];
		if (playgroundId) {
			costPlaygroundForPayBooking = [ ...this.getCostPlaygroundForPayBooking() ];
		}

		// Сейчас проверка цены корта
		const validCheck = (cost) => {
			if (cost === null) {
				return 'Стоимость данного корта не указана администратором, уточняйте лично. Итоговая цена будет посчитана без учёта аренды корта.';
			}
		};

		const templateAdditionalServiceCost = (_values) => {

			if(!isEmptyObject(costAdditionalService)) {
				let _array = [];
				for (let _key in costAdditionalService) {
					if(Object.prototype.hasOwnProperty.call(costAdditionalService, _key)) {
						_array.push(costAdditionalService[_key])
					}
				}
				return _array.map(_item => {
					if(_item.count > 0) {
						const _cost = calcCostService(
							`${dateBooking} ${_values.start_time}`,
							`${dateBooking} ${_values.end_time}`,
							[{
								time: moment.range(
									`${dateBooking} ${_values.start_time}`,
									`${dateBooking} ${_values.end_time}`
								),
								cost: _item.pricePerHour
							}]
						) * +_item.count;

						return <CostInformation key={_item.uuid} title={_item.name}>
							<MoneyFromat cost={_cost} />
						</CostInformation>
					}
					return null
				});
			}
		};

		return(
			<ModalComponent
				isOpenModal={isOpenModal}
				closeModal={() => {
					closeModal()
					this.onCancel()
				}}
				title='Бронирование'
				subTitle={`с ${availableRange.startTime} до ${availableRange.endTime}`}
			>
				<Form
					onSubmit={(values) => {
						if (!showFileldPassword && !isAuthorization) {
							this.onRegisterUser(values);
						} else {
							this.onSubmitBooking(values);
						}
					}}
					initialValues={{
						playground: 'playground_other',
						players_count: '1'
					}}
					validate={values => {
						const errors = {};
						if(values.start_time && values.end_time) {
							const isTimeRequired = startTimeBeforeEndTime(
								moment(values.start_time, 'HH:mm'),
								moment(values.end_time, 'HH:mm')
							)();

							if (isTimeRequired) {
								errors.start_time = isTimeRequired
								errors.end_time = isTimeRequired
							}
						}
						return errors;
					}}
					render={({ handleSubmit, values, errors, touched }) => {
						let costTrainerService = '--:--';
						let costPlaygroundRent = '--:--';
						let sumCostAdditionalService = 0;

						if (!errors.start_time && !errors.end_time) {
							costTrainerService = calcCostService(
								`${dateBooking} ${values.start_time}`,
								`${dateBooking} ${values.end_time}`,
								this.props.cost
							)

							costPlaygroundRent = calcCostService(
								`${dateBooking} ${values.start_time}`,
								`${dateBooking} ${values.end_time}`,
								costPlaygroundForPayBooking
							)

							for (let _key in costAdditionalService) {
								if(Object.prototype.hasOwnProperty.call(costAdditionalService, _key) && costAdditionalService[_key].count >= 0) {
									sumCostAdditionalService = sumCostAdditionalService + (calcCostService(
										`${dateBooking} ${values.start_time}`,
										`${dateBooking} ${values.end_time}`,
										[{
											time: moment.range(
												`${dateBooking} ${values.start_time}`,
												`${dateBooking} ${values.end_time}`
											),
											cost: costAdditionalService[_key].pricePerHour
										}]
									) * costAdditionalService[_key].count)

								}
							}
						};

						return (
							<form onSubmit={handleSubmit} className="b-booking-form">
								<fieldset className={ cn('b-booking-form__fieldset', {
									'b-booking-form__fieldset--error': (errors.start_time && touched.start_time) || (errors.end_time && touched.end_time)
								})}>
									<legend className="b-modal__title-group">Время</legend>
									<p className="b-input__label-info b-input__label-info--top">Допустимый шаг - 5 минут</p>
									<div className="gl-row-gap">
										<Field
											name='start_time'
											validate={value => {
												return composeValidators(
													required(),
													validFormatTime('Поле времени начала бронирования указано не полностью'),
													rangeContainsDate(
														Moment.range(
															moment(availableRange.startTime, 'HH:mm'),
															moment(availableRange.endTime, 'HH:mm')
														),
														moment(value, 'HH:mm'),
														'Время начала бронирования не входит в допустимый диапазон'
													)
												)(value)
											}}
											render={({ input }) => {
												if(input.value.length === 5) {
													input.onChange(stepTime(input.value, stepMinIncrement))
												}
												return <TimeField
													{...input}
													labelText='С'
													idInput='startBooking'
													nameInput={input.name}
													theme={{blackColor: true}}
													modif='b-input--time-booking'
												/>
											}}
										/>

										<Field
											name='end_time'
											validate={value => {
												return composeValidators(
													required(),
													validFormatTime('Поле времени окончания бронирования указано не полностью'),
													rangeContainsDate(
														Moment.range(
															moment(availableRange.startTime, 'HH:mm'),
															moment(availableRange.endTime, 'HH:mm')
														),
														moment(value, 'HH:mm'),
														'Время окончания бронирования не входит в допустимый диапазон'
													)
												)(value)
											}}
											render={({ input }) => {
												if(input.value.length === 5) {
													input.onChange(stepTime(input.value, stepMinIncrement, 'endScheduleTime'))
												}
												return <TimeField
													{ ...input }
													labelText='По'
													idInput='endBooking'
													nameInput={input.name}
													theme={{blackColor: true}}
													modif='b-input--time-booking'
												/>
											}}
										/>
									</div>
									{errors.start_time && touched.start_time
										? <p className="b-booking-form__error">
											{errors.start_time}
										</p>
										: errors.end_time && touched.end_time
										? <p className="b-booking-form__error">
											{errors.end_time}
										</p>
										: null
									}

								</fieldset>

								<fieldset className="b-booking-form__fieldset">
									<legend className="b-modal__title-group">Корт</legend>
									<Field
										name='playground'
										value='playground_other'
										type='radio'
										render={({ input }) => {
											return <Radio
												id='playground_other'
												text='Другое'
												{...input}
											/>
										}}
									/>

									{playgroundsForTraining ? playgroundsForTraining.map(item => {
										return <Field
												key={`playground_${item.uuid}`}
												name='playground'
												value={item.uuid}
												type='radio'
												render={({ input }) => {
													return <Radio
														id={`playground_${item.uuid}`}
														text={item.name}
														{...input}
													/>
												}}
											/>
									}): null}
									<OnChange
										name="playground"
										children={value => {
											this.setState({
												playgroundId: value === 'playground_other' ? null : value
											});
										}}
									/>
								</fieldset>

								<fieldset className="b-booking-form__fieldset">
									<legend className="b-modal__title-group">Доп. информация</legend>

									<Field
										name="players_count"
										validate={composeValidators(
											required(),
											negativeNumber()
										)}
										render={({ input, meta }) => {
											return <Input
												{ ...input }
												typeInput="number"
												placeholder="Количество игроков"
												labelText="Количество игроков"
												idInput="players_count"
												nameInput={input.name}
												theme={{blackColor: true}}
												error={meta.error && meta.touched && meta.error}
											/>
										}}
									/>

									{equipments.length > 0 ? equipments.map((equipment) => {
										return <Fragment>
										<Field
											key={equipment.uuid}
											name={`equipments.${equipment.uuid}`}
											validate={negativeNumber()}
											render={({ input, meta }) => {
												return <Input
													{ ...input }
													typeInput="number"
													labelText={`${equipment.name} (шт.)`}
													placeholder='Количество'
													idInput={equipment.uuid}
													nameInput={input.name}
													theme={{blackColor: true}}
													infoLabel={`Доступно: ${equipment.availability}, стоимость: ${convertTypeMoney(equipment.price_per_hour, 'RUB', 'banknote')} ₽/час`}
													error={meta.error && meta.touched && meta.error}
												/>
											}}
										/>
										<OnChange
											name={`equipments.${equipment.uuid}`}
											children={value => {
												this.setState(() => {
													return {
														costAdditionalService: {
															...costAdditionalService,
															[equipment.uuid]: {
																name: equipment.name,
																uuid: equipment.uuid,
																pricePerHour: equipment.price_per_hour,
																count: value
															}
														}
													}
												})
											}}
										/>
										</Fragment>
									}) : null }

								</fieldset>

								<fieldset className="b-booking-form__fieldset">
									<legend className="b-modal__title-group">Стоимость</legend>
									{/* TODO_HOT: сразу показывать общую стоимость из суммы */}
									{!errors.start_time && !errors.end_time
										? <Fragment>
											<CostInformation
												modif="b-cost-information--total" title="Итого:">
												{/* TODO_AMED: добавить "более" для корта без цены */}
												{ playgroundId ? 'Более ' : ''}
												<MoneyFromat
													cost={+costTrainerService + +costPlaygroundRent + +sumCostAdditionalService}
												/>
											</CostInformation>

											<CostInformation title="Услуги тренера">
												<MoneyFromat cost={costTrainerService} />
											</CostInformation>

											<CostInformation title="Аренда корта">
												{playgroundId
													? <MoneyFromat cost={costPlaygroundRent} />
													: '0 ₽'
												}
											</CostInformation>

											{templateAdditionalServiceCost(values)}
										</Fragment>
										: <p>Будет расчитана автоматически</p>
									}
								</fieldset>

								{!isAuthorization ?
									<fieldset className="b-booking-form__fieldset">
										<legend className="b-modal__title-group">Данные о вас</legend>

										{showFileldPassword ?
											<Fragment>
												{registeredNewUser
													? <div className="b-booking-form__note">
														На ваш номер телефона выслан пароль. Введите его в поле ниже, а затем нажмите кнопку <i>"Подтвердить"</i>.
														<br/>
														Пароль можно использовать повторно для авторизации в системе по вашему номеру телефона.
													</div>

													: <div className="b-booking-form__note">
														Вы уже зарегистрированный пользователь.
														<br/>
														Введите свой пароль авторизации или
														<a className="link-in-text-black" href="" title=""
															onClick={(e) => {
																e.preventDefault();
																resetPasswordRequest({
																	phone: telWithoutPlus(values.phone)
																})
															}
														}> запросите новый пароль</a>.
													</div>
												}

												<Field
													name='password'
													validate={required()}
													render={({ input, meta }) => {
														return <Input
															// labelText="Пароль"
															typeInput="password"
															placeholder="Введите пароль"
															idInput="password"
															nameInput={input.name}
															theme={{blackColor: true}}
															error={meta.error}
															{ ...input }
														/>
													}}
												/>
											</Fragment>
										:
											<Fragment>
												<Field
													name='first_name'
													validate={required()}
													render={({ input, meta }) => {
														return <Input
															labelText='Имя'
															typeInput='text'
															idInput='first_name'
															nameInput={input.name}
															theme={{blackColor: true}}
															error={meta.error && meta.touched && meta.error}
															{...input}
														/>
													}}
												/>

												<Field
													name='last_name'
													validate={required()}
													render={({ input, meta }) => {
														return <Input
															labelText='Фамилия'
															typeInput='text'
															idInput='last_name'
															nameInput='last_name'
															theme={{blackColor: true}}
															error={meta.error && meta.touched && meta.error}
															{ ...input }
														/>
													}}
												/>

												<div className={cn("b-input b-input--black-color", {
													'error': errors.phone && touched.phone
												})}>
													<label className="b-input__label" htmlFor="phone">Телефон</label>
													<Field
														name='phone'
														validate={composeValidators(
															required(),
															fullTelNumber(18)
														)}
														render={({ input, meta }) => {
															return <Fragment>
																<InputMask
																	className='b-input__input'
																	id="phone"
																	mask="+7 (999) 999-99-99"
																	maskChar={null}
																	type="tel"
																	{ ...input }
																/>
																{meta.error && meta.touched &&
																	<p className="b-input__error">
																		{meta.error}
																	</p>
																}
															</Fragment>
														}}
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
															modif="b-checkbox--align-top"
															error={meta.error && meta.touched ? meta.error : null}
														>
															<span>Я принимаю <a href="/agreement" title="Пользовательское соглашение" target="blank">пользовательское соглашение</a></span>
														</Checkbox>
													}}
												/>
											</Fragment>
										}
									</fieldset>
								:
									null
								}

								{ !!playgroundId &&
									<p className="b-booking-form__error">
										{validCheck( calcCostService(
											`${dateBooking} ${values.start_time}`,
											`${dateBooking} ${values.end_time}`,
											costPlaygroundForPayBooking)
										)}
									</p>
								}

								<div className="b-booking-form__button-wrapper">
									<div className="b-booking-form__button">
										<Button
											type="submit"
											modif="b-button--full"
										>
											{!showFileldPassword ? "Забронировать" : "Подтвердить"}
										</Button>
									</div>

									<div className="b-booking-form__button">
										<Button
											theme={{orange: true}}
											onClick={this.onCancel}
											modif="b-button--full"
										>Отмена</Button>
									</div>
								</div>
							</form>
						)
					}}
				/>
			</ModalComponent>
		)
	}
}

class CostInformation extends Component {

	render() {
		const { title, children, modif } = this.props;
		const classNameBlock = cn(
			'b-cost-information',
			modif
		);

		return (
			<div className={classNameBlock}>
				<div className="b-cost-information__title">{title}</div>
				<div className="b-cost-information__cost">
					{children}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ identificate, equipment }) => {
	return {
		isAuthorization: identificate.authorization,
		equipments: equipment.equipments
	}
};

const mapStateToDispatch = (dispatch) => {
	return {
		createBooking: (typeBooking, data) => dispatch(createBooking(typeBooking, data)),
		loginAction: (data, toMain, callback) => dispatch(userActions.login(data, toMain, callback)),
		resetPasswordRequest: (data) => dispatch(userActions.resetPasswordRequest(data)),
		getAllEquipmentsForBookableAction: (bookable_type, bookable_uuid) => dispatch(getAllEquipmentsForBookable(bookable_type, bookable_uuid))
	}
}

export default connect(mapStateToProps, mapStateToDispatch)(BookingModal);
