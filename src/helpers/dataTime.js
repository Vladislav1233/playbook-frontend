import moment from 'moment';

// Note: функция, которая генерирует данные старта и конца дня, месяца, года. Принимает местное время, а возвращает UTC.
export function dataTime({ 
    valueStart = new Date(), 
    valueEnd = new Date(), 
    startOf = 'day', 
    endOf = 'day', 
    format = 'YYYY-MM-DD HH:mm:ss' 
} = {}) {

    return {
        start_time: moment.utc( moment(valueStart).startOf(startOf) ).format(format),
        end_time: moment.utc( moment(valueEnd).endOf(endOf) ).format(format)
    }
};