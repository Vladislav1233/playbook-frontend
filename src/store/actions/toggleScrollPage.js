import {
  SCROLL_PAGE
} from '../constants/scrollPage';

/*
* toggleScrollPage - функция, которая отключает скролл страницы
* isNoScroll = true - страница не скроллиться
* isNoScroll = false - страница скроллиться
*/
export function toggleScrollPage(isNoScroll) {
  return dispatch => {
      dispatch({
        type: SCROLL_PAGE,
        payload: isNoScroll
      })
  }
}