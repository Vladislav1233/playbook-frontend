/*
* convertTypeMoney - Функция, которая конвертирует деньги в монету или в банкноту.
* number - количество
* codeCurrency - код денежной валюты (согласно этому справочнику - https://mvf.klerk.ru/spr/spr60.htm). У разных валют свой делитель, поэтому определяем его по коду валюты.
* convertTo - конвертировать в банкноту === 'banknote' или в монету === 'coin'.
*/

export function convertTypeMoney(number, codeCurrency, convertTo) {
    console.log(+number);

    const operation = (convertOperation, divider) => {
        if (convertOperation === 'coin') {
            return +number * divider
        } else if (convertOperation === 'banknote') {
            return +number / divider
        }
    };

    switch (codeCurrency) {
        case 'USD':
            return operation(convertTo, 100);

        case 'RUB':
            return operation(convertTo, 100);

        default:
            break;
    };
};