// TODO: весь filterSchedule можно сделать как middleware, обдумать это и реализовать
export const filterSchedule = (schedule, day) => {
    console.log(schedule);
    console.log(day);
    // Note: Когда кликнули на дату в календаре мы её получаем и фильтруем расписание по дате в календаре.
    const scheduleObj = schedule.filter(item => item.date === day);
    return scheduleObj[0];
}