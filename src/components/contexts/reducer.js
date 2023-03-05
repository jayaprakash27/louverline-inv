import { legacy_createStore as createStore } from "redux";
import { fetchUser } from '../utils/fetchLocalStorage'

const userInfo = fetchUser();

const initialState = {
    users: [],
    signedInUser: userInfo,
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SIGNUP':
            return {
                ...state,
                users : [...state.users, action.payload]
            }
        case 'LOGIN':
            return {
                ...state,
                signedInUser: action.email
            }
        case 'LOGOUT':
            return {
                    ...state,
                    signedInUser: null
            }
        default:
            return state;
    }
}

export default createStore(reducer)