import axios from 'axios'
import {
    ADD_USER,
    EMAIL_EXISTS
} from './types'

export const addUser = (userData) =>async(dispatch) => {
    let res = await axios.post('/api/userAuthService/addUser', userData)
    if(res.data.status == 1){
        dispatch({
            type: ADD_USER,
            payload: true
        })
    }
    else if(res.data.status == 2){
        dispatch({
            type: EMAIL_EXISTS,
            payload: true
        })
    }
    else{
        dispatch({
            type: ADD_USER,
            payload: false
        })
    }

}
