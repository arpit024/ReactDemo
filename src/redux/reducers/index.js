import { combineReducers } from 'redux'
import addUserReducer from './addUserReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    auth: authReducer,
    add: addUserReducer,
    errors: errorReducer
})