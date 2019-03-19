export const required = (value, text = 'Обязательное поле') => {
	return !!value ? undefined : text
};

export const startTimeBeforeEndTime = (valueStart, valueEnd, text = 'Время начала бронированя должно раньше времени окончания.') => {
	/*
	* value должен быть moment объектом.
	*/
	// console.log(valueStart, valueEnd)
	return valueStart.isBefore(valueEnd) ? text : undefined
};

/*
* composeValidators - объеденяет в себе несколько обработчиков валидации и вызывает их в переданном порядке.
*/
export const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);