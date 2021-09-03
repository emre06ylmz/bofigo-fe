import React from "react";
import { Redirect } from "react-router-dom"

import { useAuthentication } from "../../../Authentication";
import LoginForm from "./LoginForm"

export default function LoginPage({ location}){
    const { user } = useAuthentication();

    if(user){
        let from = location.state && location.state.from.pathname;
        let redirectLocation = from ? from : "/home";
        return <Redirect to={redirectLocation}></Redirect>
    }

    return <LoginForm></LoginForm>
}