/*
* composeValidators - объеденяет в себе несколько обработчиков валидации и вызывает их в переданном порядке.
*/
export const composeValidators = (...validators) => value => 
    validators.reduce((error, validator) => error || validator(value), undefined);

export const required = (text = 'Обязательное поле') => value => {
	return value ? undefined : text
};

export const startTimeBeforeEndTime = (valueStart, valueEnd, text = 'Время начала бронированя должно быть раньше времени окончания.') => () => {
	/*
	* value должен быть moment объектом.
    */
    if (valueStart && valueEnd) {
        if(valueStart.isBefore(valueEnd)) {
            return undefined
        }
 
        return text        
    }
};

/*
* Диапазон содержит входящую дату?
* availableRange - доступный диапазон даты. moment range object.
* date - дата. moment object.
*/
export const rangeContainsDate = (availableRange, date, text) => value => {
    return availableRange.contains(date) ? undefined : text
}

/*
* Проверка что поле времени заполнено полностью.
*/
export const validFormatTime = (text = 'Поле времени заполнено не полностью') => value => {
    return value.length === 5 ? undefined : text;
};

/*
* Подтверждение пароля.
*/
export const confirmPassword = (password, text = 'Пароли не совпадают') => value => {
    return password === value ? undefined : text;
};

export const fullTelNumber = (countNumber, text="Телефон введён не полностью") => value => {
    return value.length === countNumber ? undefined : text
};