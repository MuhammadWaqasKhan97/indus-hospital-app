const tokensReducer = (state = {}, action) => {
    switch(action.type) {
        case "UPDATE_TOKENS": {
            return {...state, tokens: action.tokens}
        }
        case "REMOVE_TOKENS": {
            return {...state, tokens: null}
        }

        default: {
            return state;
        }
    }
}

export default tokensReducer