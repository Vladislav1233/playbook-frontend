import { convertTypeMoney } from './convertTypeMoney';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const calcCostService = (startTimeBooking, endTimeBooking, rangeCostArray, formatForTime = 'YYYY-MM-DD HH:mm:ss') => {
    /*
    * calcCost - функция подсчета стоимости услуги бронирования.
    * startTimeBooking (string. example: '12:00') - время начала букинга.
    * endTimeBooking (string. example: '18:00') - время окончания букинга.
    * rangeCostArray (array. example: [{time: object moment range, cost: 10000 (cent)}]) - массив со стоимостью часа в диапазоне времени.
    */

    const dividerForCostTime = 3600;
    let resultCost = 0;
    let costMinute = 0;

    const timeFromBooking = moment(startTimeBooking, formatForTime);
    const timeToBooking = moment(endTimeBooking, formatForTime);
    const rangeBooking = moment.range(timeFromBooking, timeToBooking);

    if (rangeCostArray.length > 0) {
        rangeCostArray.forEach(itemRangeCostArray => {
            // Note: Получаем пересекающийся диапазон времени которое букаем с временем которое указано в стоимости. 
            const intersectRange = rangeBooking.intersect(itemRangeCostArray.time);
            
            if (intersectRange) {
                resultCost = resultCost + (intersectRange.diff('seconds') / dividerForCostTime * itemRangeCostArray.cost);
                
                // Note: Получаем стоимость минуты, чтобы прибавить её к минуте оставшегося дня 
                // (так как мы 00:00 не можем ввести то конце дня у нас 23:59)
                if (timeToBooking.format('HH:mm') === '23:59') {
                    costMinute = (Math.round((itemRangeCostArray.cost / 60) / 100) * 100)
                }
            }
        });

    } else {
        return null
    }

    return convertTypeMoney(resultCost + costMinute, 'RUB', 'banknote');
};

export default calcCostService;