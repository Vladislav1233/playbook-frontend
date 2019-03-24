
/*
* Шаг для времени.
* Возвращает строку с времен приближенным к установленному шагу.
* time - string. example '12:00'
* minIncrementProp - number. Кратно этому числу.
*/
export function stepTime(time, minIncrementProp = 5) {
    let hour = time.substring(0, 2);
    let minutes = time.substring(3, 5);

    if (minutes % minIncrementProp !== 0) {
        const roundedTime =
            Math.round((hour * 60 + minutes) / minIncrementProp) * minIncrementProp;

        const timeVal = ("0" + Math.floor(roundedTime / 60)).slice(-2)
                        + 
                        ("0" + roundedTime % 60).slice(-2);
        
        return `${hour}:${timeVal.substring(2, 4)}`
    } 
        return time
    
}
