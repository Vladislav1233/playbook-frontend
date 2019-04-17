import React, { Component } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

// Note: componetns
import MoneyFormat from '../ui-kit/MoneyFormat';

// Note: helpers
import calcCostService from '../../helpers/calcCostService';

import '../../style/bem-blocks/b-equipments-rent/index.scss';

const moment = extendMoment(Moment);

class EquipmentsRent extends Component {

    render() {
        const { equipmentRent, startTimeRent, endTimeRent } = this.props;

        return(
            <ul className="b-equipments-rent">
                {equipmentRent.map(equipment => {
                    return <li key={equipment.equipment.uuid}>
                        <div>{equipment.equipment.name}</div>
                        <div>
                            <span className="gl-tiny">Количество: </span>
                            {equipment.count}</div>
                        <div>
                            <span className="gl-tiny">К оплате: </span>
                            <MoneyFormat
                                cost={calcCostService(
                                    startTimeRent,
                                    endTimeRent,
                                    [{
                                        time: moment.range(startTimeRent, endTimeRent),
                                        cost: equipment.equipment.price_per_hour
                                    }],
                                    'YYYY-MM-DD HH:mm:ss ZZ'
                                ) * equipment.count}
                            />
                        </div>
                    </li>
                })}
            </ul>
        )
    }
}

export default EquipmentsRent;
