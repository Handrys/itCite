import { v4 as uuid } from 'uuid'
import { postsReducer } from './posts-reducer'
import { userReducer } from './user-reducer'
import { dialogReducer } from './dialog-reducer'
import { errorsReducer } from './errors-reducer'

const ADD_POST  = 'addPost'
const DELETE_POST  = 'deletePost'
const UPDATE_POST  = 'updatePost'
const ISLOADING_POST  = 'addPost'

const USER = 'user'

export function reducer(state, action) {

    state.posts = postsReducer(state.posts, action);
    state.user = userReducer(state.user, action); 
    state.dialog = dialogReducer(state.dialog, action);
    state.errors = errorsReducer(state.errors, action)
    return {...state}
}