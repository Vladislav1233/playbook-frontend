import { TOGGLE_MENU, CLOSE_MENU } from '../constants/toggleMenu';

export function toggleMenu() {
    return {
        type: TOGGLE_MENU
    }
}

export function closeMenu() {
    return {
        type: CLOSE_MENU
    }
}