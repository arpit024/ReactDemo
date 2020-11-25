import axios from 'axios'
import {
    ADD_USER,
    GET_ERRORS
} from './types'

export const addUser = (userData) => dispatch => {
    axios.post('/addUser', userData)
        .then(res => dispatch({
            type: ADD_USER,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        }))
}