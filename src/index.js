import React from 'react';
import ReactDom from 'react-dom';
import {useRoutes} from "./Routes";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useAuth} from './Auth'
import { AuthContext } from './AuthContext';
import './app.css';

const task = {
    id: 1,
    name: 'Blue line',
    text: 'Each pixel of <a href = "image.png">this picture</a> mean something...but what? Your task is to find out what they mean together.'
}


const RouterComponent = () => {
    const {token, teamName, teamId, onLoggedIn, onLoggedOut} = useAuth();
    const authenticated = !!token;
    const routes = useRoutes(authenticated, teamName, onLoggedIn, onLoggedOut);
    return (
        <AuthContext.Provider value = {{token: token, teamId: teamId}}>
        <Router>
            {routes}
        </Router>
        </AuthContext.Provider>
    );
}

const App = () => {
    return (<div className='body' style={{height: '100vh'}}>
        <RouterComponent/>
    </div>);
}

ReactDom.render(<App />, document.getElementById('root'));