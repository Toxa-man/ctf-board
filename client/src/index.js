import React from 'react';
import ReactDom from 'react-dom';
import { useRoutes } from "./Routes";
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './Auth'
import { AuthContext } from './AuthContext';
import './app.css';

const task = {
    id: 1,
    name: 'Blue line',
    text: 'Each pixel of <a href = "image.png">this picture</a> mean something...but what? Your task is to find out what they mean together.'
}


const RouterComponent = () => {
    const { token, username, userId, onLoggedIn, onLoggedOut } = useAuth();
    const authenticated = !!token;
    const routes = useRoutes(authenticated, username, onLoggedIn, onLoggedOut);
    return (
        <AuthContext.Provider value={{ token: token, userId: userId, onLoggedOut: onLoggedOut }}>
            {routes}
        </AuthContext.Provider>
    );
}

const App = () => {
    return (<div className='body' style={{ height: '100vh' }}>
        <RouterComponent />
    </div>);
}

ReactDom.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));