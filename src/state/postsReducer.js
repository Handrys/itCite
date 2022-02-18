const postsReducer = (state, action) => {
    switch (action.type) {
        case 'add' :
            return {
                ...state,
                data: action.payload,
                isPending: false,
            };
        default:
            return state;    
    }
}

export default postsReducer;