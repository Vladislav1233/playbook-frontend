import moment from 'moment';

// Note: функция, которая генерирует данные старта и конца дня, месяца, года
export function dataTime({ valueStart = new Date(), valueEnd = new Date(), startOf = 'day', endOf = 'month', format = 'YYYY-MM-DD hh:mm:ss' } = {}) {
    return {
        start_time: moment(valueStart).startOf(startOf).format(format),
        end_time: moment(valueEnd).endOf(endOf).format(format)
    }
}