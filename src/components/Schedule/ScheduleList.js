import React, { Component } from 'react';
import cn from 'classnames';

// component
import ScheduleItem from './ScheduleItem';

// style
import '../../style/bem-blocks/b-schedule-list/index.scss';

class ScheduleList extends Component {

  render() {
    const { template, list, playgroundsForTraining, userId, isWhoBooked } = this.props;
    // Note: классы css
    const classNameItem = cn('b-schedule-list__item', {
        'b-schedule-list__item--hover': item.isStatus || item.freeCourt
    });

    return (
        <ul className="b-schedule-list">
            {
                list.map((item, index) => (
                    <li className={classNameItem} key={index}>
                        <ScheduleItem 
                            dataScheduleItem={item}
                            template={template} 
                            playgroundsForTraining={playgroundsForTraining}
                            userId={userId}
                            isWhoBooked={isWhoBooked}
                            creator={item.creator}
                        />
                    </li>
                ))
            }
        </ul>
    )
  }
}

export default ScheduleList;
