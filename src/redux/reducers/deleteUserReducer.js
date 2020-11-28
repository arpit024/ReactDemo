import { DELETE_USER, CLOSE_DIALOG } from '../actions/types'

const initialState = {
    
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DELETE_USER:
            return {
                success: action.payload
            };
        case CLOSE_DIALOG:
            return {
                success: action.payload
            };
        default:
            return state;
    }
}