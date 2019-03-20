/*
* composeValidators - объеденяет в себе несколько обработчиков валидации и вызывает их в переданном порядке.
*/
export const composeValidators = (...validators) => value => 
    validators.reduce((error, validator) => error || validator(value), undefined);

export const required = (text = 'Обязательное поле') => value => {
	return !!value ? undefined : text
};

export const startTimeBeforeEndTime = (valueStart, valueEnd, text = 'Время начала бронированя должно быть раньше времени окончания.') => () => {
	/*
	* value должен быть moment объектом.
    */
    if (valueStart && valueEnd) {
        if(valueStart.isBefore(valueEnd)) {
            return undefined
        } else {
            return text
        }
    }
};

/*
* Диапазон содержит входящую дату
* availableRange - доступный диапазон даты. moment range object.
* date - дата. moment object.
*/
export const rangeContainsDate = (availableRange, date, text) => value => {
    console.log(availableRange);
    console.log(date);
    console.log(availableRange.contains(date))

    return availableRange.contains(date) ? undefined : text
}