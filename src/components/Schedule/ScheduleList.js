import React, { Component } from 'react';

// component
import ScheduleItem from './ScheduleItem';

// style
import '../../style/bem-blocks/b-schedule-list/index.scss';

class ScheduleList extends Component {

  render() {
    const { template, list, playgroundsForTraining, userId, isWhoBooked } = this.props;

    return (
        <ul className="b-schedule-list">
            {
                list.map((item, index) => (
                    <li className={`b-schedule-list__item ${item.isStatus || item.freeCourt ? 'b-schedule-list__item--hover' : ''}`} key={index}>
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
