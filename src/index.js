import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './registerServiceWorker';
import App from './App';
import 'antd/dist/antd.css';

//ReactDOM.render(<App />, document.getElementById('app'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// Add the sessionReducer
ReactDOM.render(
        <App />,
    document.getElementById('app')
);
serviceWorker.unregister();