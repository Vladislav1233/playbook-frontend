// // TODO: доработать всю страницу по примеру ScheduleTrainer

// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// // component
// import Schedule from '../../components/Schedule/Schedule';

// // helpers
// import { filterSchedule } from '../../helpers/filterSchedule';

// class ScheduleCourt extends Component {

//     render() {
//         const { scheduleCourt } = this.props;

//         const settingSlider = {
//             nav: false,
//             autoHeight: true,
//             loop: false,
//             controlsText: ['', ''],

//             responsive: {
//                 768: {
//                     gutter: 20,
//                     items: 2
//                 },
//                 1024: {
//                     items: 3
//                 },
//                 1680: {
//                     items: 4,
//                     autoHeight: false
//                 }
//             }
//         }

//         return (
//             <Schedule
//                 schedule={scheduleCourt}
//                 settingSlider={settingSlider}
//                 template={'court'}
//             />
//         )
//     }
// }

// const mapStateToProps = store => {
//     return {
//         scheduleCourt: filterSchedule(store.scheduleCourt, store.getDayFilter)
//     }
// }

// const mapStateToDispatch = (dispatch) => {
//     return {
//     }
// }

// export default connect(mapStateToProps, mapStateToDispatch)(ScheduleCourt);