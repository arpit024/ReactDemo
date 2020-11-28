import { combineReducers } from 'redux'
import addUserReducer from './addUserReducer'
import deleteUserReducer from './deleteUserReducer'
import updateUserReducer from './updateUserReducer'
export default combineReducers({
    add: addUserReducer,
    delete: deleteUserReducer,
    update: updateUserReducer
})