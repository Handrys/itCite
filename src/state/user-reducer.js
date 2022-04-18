const IS_LOGIN = 'isLogin'

export const userReducer = (state, action) => {
    switch (action.type) {
        case IS_LOGIN: {
            return {
                ...state,
                authorized: action.payload.authorized,
                userName: action.payload.userName,
            }
        }
        default:
            return state
    }
    
}