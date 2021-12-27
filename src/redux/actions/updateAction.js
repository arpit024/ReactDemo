import axios from 'axios'
import {
    EDIT_USER
} from './types'

export const updateUser = (userData) =>async(dispatch) => {
    let res = await axios.put(`/api/userService/updateUser`,userData)
    if(res.data.status == 1){
        dispatch({
            type: EDIT_USER,
            payload: true
        })
    }else{
        dispatch({
            type: EDIT_USER,
            payload: false
        })
    }

}
