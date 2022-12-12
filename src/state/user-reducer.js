const USER = 'user'
const USER_POSTS = 'userPosts'

export const userReducer = (state, action) => {
    switch (action.type) {
        case USER: {
            return {
                ...state,
                authorized: action.payload.authorized,
                userData: action.payload.userData,
                authStatus: action.payload.authStatus,
            }
        }
        case USER_POSTS: {
            return {
                ...state,
                myPosts: action.payload.myPosts
            }
        }
        default:
            return state
    }
    
}