import React, { Component } from 'react';

// component
import ScheduleItem from '../ScheduleItem';

// style
import '../../style/bem-blocks/b-schedule-list/index.scss';

class ScheduleList extends Component {


  render() {
    // const listScheduleData = this.props.list;

    return (
        <ul className="b-schedule-list">
            
            <ScheduleItem />
        </ul>
    )
  }
}

export default ScheduleList;


// <ul className="b-schedule-list">
//             {listScheduleData ? listScheduleData.map(item => (
//                 <li className="b-schedule-list__item" key={item.idItemScheduleList}>
//                     <ScheduleItem dataScheduleItem={item}/>
//                 </li>
//             )) 
//             : 
//                 <div>Расписания нет</div>
//             }
//         </ul>