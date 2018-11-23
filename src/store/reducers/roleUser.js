// Question: как реализовывать? наверное здесь должно быть еще id юзера, и потом когда мы узнаем id юзера, мы грузим его данные через middleware. Или данные когда юзер авторизовывается уже приходят?
const initialState = {
    role: 'guest' // Note: роли могут быть user - зарегистрирован, trainer, organization-admin, admin
}

export default function(state = initialState) {
    return state
}