import React, { Component } from 'react';

// component
import ScheduleItem from './ScheduleItem';

// style
import '../../style/bem-blocks/b-schedule-list/index.scss';

class ScheduleList extends Component {

  render() {
    const list = this.props.list;
    const { template } = this.props;

    return (
        <ul className="b-schedule-list">
            {
                list ? list.map(item => (
                    <li className={`b-schedule-list__item ${item.status || item.freeCourt ? 'b-schedule-list__item--hover' : ''}`} key={item.idItemScheduleList}>
                        <ScheduleItem dataScheduleItem={item} telTrainer={this.props.telTrainer} template={template}/>
                    </li>
                ))
                :
                <div>Расписания нет</div>
            }
        </ul>
    )
  }
}

export default ScheduleList;
