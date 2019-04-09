
/*
* Шаг для времени.
* Возвращает строку с времен приближенным к установленному шагу.
* time - string. example '12:00'
* minIncrementProp - number. Кратно этому числу.
* nameField - название поля с которого приходит время. Если будет конец расписания 23:59 то это допустимое значение, типа конец дня.
*/
export function stepTime(time, minIncrementProp = 5, nameField) {
    let hour = time.substring(0, 2);
    let minutes = time.substring(3, 5);
    console.log()

    if (nameField === 'endScheduleTime' && minutes === '59') {
        return time
    } else if(minutes > 55) {
        return `${hour}:55`
    } else if (minutes % minIncrementProp !== 0) {
        const roundedTime =
            Math.round((hour * 60 + minutes) / minIncrementProp) * minIncrementProp;

        const timeVal = ("0" + Math.floor(roundedTime / 60)).slice(-2)
                        + 
                        ("0" + roundedTime % 60).slice(-2);
        
        return `${hour}:${timeVal.substring(2, 4)}`
    }
    
    return time
    
}

/*
* Расписание конца дня когда вводят 00:00 это преобразуется в 23:59. Так как 00:00 считается следующим днем.
* time - string. example '00:00'
*/
export function endTimeSchedule(time) {
    return time === '00:00' ? '23:59' : time;
}