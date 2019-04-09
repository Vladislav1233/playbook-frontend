import React from 'react';
import NumberFormat from 'react-number-format';

const MoneyFromat = (props) => {
    const { cost } = props;

    return <NumberFormat
        value={cost}
        suffix=' ₽'
        thousandSeparator={' '}
        displayType='text'
        decimalScale={0}
    />
};

export default MoneyFromat;