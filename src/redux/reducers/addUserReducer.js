import { ADD_USER, CLOSE_DIALOG, EMAIL_EXISTS } from '../actions/types'

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    age: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                success: action.payload
            };
        case CLOSE_DIALOG:
            return {
                success: action.payload
            };
        case EMAIL_EXISTS:
            return {
                emailExists: action.payload
            }
        default:
            return state;
    }
}