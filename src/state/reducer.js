import { v4 as uuid } from 'uuid'


const ADD_POST  = 'addPost'
const DELETE_POST  = 'deletePost'
const UPDATE_POST  = 'updatePost'
const ISLOADING_POST  = 'addPost'

const IS_LOGIN = 'isLogin'

export function reducer(state, action) {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                data: action.payload,
                isPending: false,
            }
        }
        case ISLOADING_POST: {
            const loading = action.payload
            return {
                ...state,
                isPending: loading,
            }
        }
        case DELETE_POST: {
            const { id } = action.payload
            return state.filter(todo => todo.id !== id)
        }
        case UPDATE_POST: {
            const { id, data } = action.payload
            return state.map(todo => (todo.id === id ? { ...todo, data } : todo))
        }
        default:
            return state;
    }
}