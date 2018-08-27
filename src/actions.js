// типы действий

export const TOGGLE_PANEL_SCHEDULE_SHOW = 'TOGGLE_PANEL_SCHEDULE_SHOW'
export const TOGGLE_PANEL_SCHEDULE_HIDE = 'TOGGLE_PANEL_SCHEDULE_HIDE'
export const TOGGLE_PANEL_SCHEDULE = 'TOGGLE_PANEL_SCHEDULE'

// генераторы действий

export function togglePanelSchedule(toggle) {
    return { type: TOGGLE_PANEL_SCHEDULE, toggle}
}