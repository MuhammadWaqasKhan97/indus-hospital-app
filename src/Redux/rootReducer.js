import { combineReducers } from 'redux'
import authReducers from './reducer/authReducer'
import tokensReducer from './reducer/tokensReducer'


export default combineReducers({
    authReducers,
    tokensReducer,
    
})