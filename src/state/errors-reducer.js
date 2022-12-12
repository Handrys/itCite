const ERRORS = 'errors'

export const errorsReducer = (state, action) => {
    switch (action.type) {
        case ERRORS: {
            return {
                ...state,
                auth: action.payload.auth
            }
        }
        default:
            return state
    }
    
}