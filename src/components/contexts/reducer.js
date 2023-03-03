import { createStore } from "redux";

const initialState = {
    users: [],
    signedInUser: null,
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case 'REGISTER':
            return {
                ...state,
                users : [...state.users, action.payload]
            }
        case 'LOGIN':
            return {
                ...state,
                loggedInUser: state.payload
            }
        default:
            return state;
    }
}

export default createStore(reducer)