const updateTokens = (tokens) => {
    return {
        type: "UPDATE_TOKENS",
        tokens
    }
}

const removeTokens = () => {
    return {
        type: "REMOVE_TOKENS"
    }
}



export {
    updateTokens,
    removeTokens
    
}