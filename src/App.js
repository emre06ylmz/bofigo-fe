import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './views/pages/login/LoginPage';
import { useAuthentication, AuthenticationProvider } from "./Authentication";
import './vibe/scss/styles.scss';
import routes from './views';

import { LocalizeProvider } from "react-localize-redux";


const PrivateRoute = ({ component: Component, ...rest }) => {
  const  { user } = useAuthentication();
  return (
    <Route
      {...rest}
      render = {props => user ? (
        <Component {...props}></Component>
      ) : (
        <Redirect
          to={{pathname: "/login",
          state: {from: props.location}}}
        ></Redirect>
      )}
    >
    </Route>
  );
};

export default function App() {
  return (
    <LocalizeProvider>
    <AuthenticationProvider>
      <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute path="/home" component={DashboardLayout} />
            {routes.map((page, key) => (
              <PrivateRoute path={page.path} component={DashboardLayout} key={key} />
            ))}
          </Switch>
      </BrowserRouter>
  </AuthenticationProvider>   
</LocalizeProvider>
  );
}
