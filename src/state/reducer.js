import { v4 as uuid } from 'uuid'


export function reducer(state, action) {
    switch (action.type) {
        case 'add': {
            return {
                ...state,
                data: action.payload,
                isPending: false,
            }
        }
        case 'loading': {
            const loading = action.payload
            return {
                ...state,
                isPending: loading,
            }
        }
        case 'delete': {
            const { id } = action.payload
            return state.filter(todo => todo.id !== id)
        }
        case 'update': {
            const { id, data } = action.payload
            return state.map(todo => (todo.id === id ? { ...todo, data } : todo))
        }
        default:
            return state;
    }
}