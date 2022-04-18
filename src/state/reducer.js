import { v4 as uuid } from 'uuid'
import { postsReducer } from './posts-reducer'
import { userReducer } from './user-reducer'

const ADD_POST  = 'addPost'
const DELETE_POST  = 'deletePost'
const UPDATE_POST  = 'updatePost'
const ISLOADING_POST  = 'addPost'

const IS_LOGIN = 'isLogin'

export function reducer(state, action) {

    state.posts = postsReducer(state.posts, action);
    state.isLogin = userReducer(state.isLogin, action); 
    
    return {...state}
}