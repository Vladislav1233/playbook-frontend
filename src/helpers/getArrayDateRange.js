import moment from 'moment';

export default function getArrayDateRange(startDate, endDate) {
    let dateArray = [];
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);

    for (; currentDate <= stopDate; currentDate = moment(currentDate).add(1, 'days')) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') );
    }

    return dateArray;
}