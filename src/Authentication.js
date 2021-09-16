import React from 'react';
import callApi from "./utils/callApi";
import {message } from 'antd';


const AuthenticationContext = React.createContext();

const initialState = {
    authenticated: false,
    user: null,
    loggingIn: false,
    loginError: null,
}

function authenticationReducer(state, action){
    switch (action.type){
        case "LOGIN":{
            return { ...state, loggingIn:true};
        }
        case "LOGIN_SUCCESS":{
            return { ...state, loggingIn:false, user: action.payload, authenticated: true};
        }
        case "LOGIN_FAIL":{
            return { ...state, loggingIn:false, user: null, loginError: action.payload.error};
        }
        case "LOGOUT":{
            return { ...state, username:"..."};
        }
        case "LOGOUT_SUCCESS":{
            return { ...state, loggingIn: false, user: null};
        }
    }
}

function useAuthentication(){
    const context = React.useContext(AuthenticationContext);

    if(!context){
        throw new Error("");
    }

    const [state, dispatch] = context;
    const loginStart = data => dispatch({ type:"LOGIN", payload: data});
    const loginSuccess = data => dispatch({ type:"LOGIN_SUCCESS", payload: data});
    const loginFail = data => dispatch({ type:"LOGIN_FAIL", payload: data});
    const logoutSuccess = data => dispatch({ type:"LOGOUT_SUCCESS", payload: null});
    const login = async function(data){
        loginStart();
        try{
            const response = await callApi({
                endpoint: "/api/application/login?username=" + data.username.trim() + "&password="+data.password.trim(),
                method: "POST",
                body: data
            });

            if(response.status == "FAILURE"){
                message.error(response.message);
                return;
            }

            if(response && response.username){
                loginSuccess(response);
            }
            if(response && response.message){
                //messageError(response.message);
                loginFail(response.message);
            }
        } catch (ex){
            loginFail(ex);
        }
    };

    const logout = async function(){
        try{
            const response = await callApi({
                url: "/api/application/logout"
            });
            message.success(response.message);
            logoutSuccess();
        }catch(ex){
            loginFail(ex);
        }
    }

    const isAuthenticated = async function(data){
        loginStart();
        try{
            const response = await callApi({
                endpoint: "/api/application/user",
                method: "GET"
            });
            if(response && response.username){
                loginSuccess(response);
            }
            if(response && response.message){
                loginFail(response.message);
            }
        } catch (ex){
            loginFail(ex);
        }
    };

    return {
        user: state.user,
        loggingIn: state.loggingIn,
        login,
        logout,
        isAuthenticated
    }


}

function AuthenticationProvider(props){
    const [state, dispatch] = React.useReducer(
        authenticationReducer,
        initialState
    );
    const value = React.useMemo(() => [state, dispatch], [state]);
    return <AuthenticationContext.Provider value={value} {...props} />
}

export {AuthenticationProvider, useAuthentication}