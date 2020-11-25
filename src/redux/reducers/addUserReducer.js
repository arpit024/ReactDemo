import { REGISTER_NEW_USER } from '../actions/types'

const initialState = {
    isRegistered: false,
    message: null
}

export default function(state = initialState, action){
    switch(action.type){
        case REGISTER_NEW_USER:
            return {
                ...state,
                isRegistered: true,
                message: action.payload
            };
        default:
            return state;
    }
}