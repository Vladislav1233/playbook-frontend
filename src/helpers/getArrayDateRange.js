import 'moment';

export default function getArrayDateRange(startDate, endDate) {
    let dateArray = [];
    const currentDate = moment(startDate);
    const stopDate = moment(endDate);

    for (; currentDate <= stopDate; currentDate = moment(currentDate).add(1, 'days')) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') );
    };

    return dateArray;
}