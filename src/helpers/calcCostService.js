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

    const timeFromBooking = moment(startTimeBooking, formatForTime);
    const timeToBooking = moment(endTimeBooking, formatForTime);
    const rangeBooking = moment.range(timeFromBooking, timeToBooking);

    if (rangeCostArray.length > 0) {
        rangeCostArray.forEach(itemRangeCostArray => {
            // Note: Получаем пересекающийся диапазон времени которое букаем с временем которое указано в стоимости. 
            const intersectRange = rangeBooking.intersect(itemRangeCostArray.time);
            
            if (intersectRange) {
                resultCost = resultCost + convertTypeMoney( intersectRange.diff('seconds') / dividerForCostTime * itemRangeCostArray.cost, 'RUB', 'banknote' );
            }
        });

    } else {
        return null
    }

    return resultCost;
};

export default calcCostService;