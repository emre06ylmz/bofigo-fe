import React  from("react");
import callApi from '../util/callApi'
import { messageError, messageSuccess } from '../util/MessageHelper'

const AuthenticationContext = React.createContext();

const initialState = {
    authenticated: false,
    user: null,
    loggingIn: false,
    loginError: null
}

function authenticationReducer(state, action){
    switch (action.type){
        case 'LOGIN': {
            return { ...state, loggingIn: true }
        }
        case 'LOGIN_SUCCESS': {
            return { ...state, loggingIn: false, user: action.payload }
        }
        case 'LOGIN_FAIL': {
            return { 
                ...state, 
                loggingIn: false, 
                user: null,
                loginError: action.payload.error 
            }
        }
        case 'LOGOUT': {
            return { ...state, username: '...' }
        }
        case 'LOGOUT_FAIL': {
            return { 
                ...state, 
                loggingIn: false, 
                user: null,
            }
        }
        case 'default': {
           throw new Error('authentication error:' + action.type);
        }
    }

    function useAuthentication(){
        const context = React.useContex(AuthenticationContext);

        if(!context) {
            throw new Error('authentication error');
        }

        const [state, dispatch] = context;
        const loginStart = data => dispatch({ type: 'LOGIN', payload: data });
    }
}