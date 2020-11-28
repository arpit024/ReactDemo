import {
    CLOSE_DIALOG
} from './types'

export const closeDialog =()=> dispatch => {
        dispatch({
            type: CLOSE_DIALOG,
            payload: false
        })
      

}
