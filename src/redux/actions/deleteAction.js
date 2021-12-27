import axios from 'axios'
import {
    DELETE_USER
} from './types'

export const deleteUser = (userData) =>async(dispatch) => {
    let res = await axios.delete('/api/userService/deleteUser', {data:{id:userData}})
    if(res.data.status == 1){
        dispatch({
            type: DELETE_USER,
            payload: true
        })
    }else{
        dispatch({
            type: DELETE_USER,
            payload: false
        })
    }

}
