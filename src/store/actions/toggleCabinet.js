import { TOGGLE_CABINET } from '../constants/toggleCabinet';

export function toggleCabinet(status) {
    return {
        type: TOGGLE_CABINET,
        payload: status
    }
}