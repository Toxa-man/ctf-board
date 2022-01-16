import React, { useContext, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react';
import './NavBar.css'
import { AuthContext } from './AuthContext';
import { useFetch } from './useFetch';

const Score = ({username}) => {
    const [score, setScore] = useState(null);
    const location = useLocation();

    const {request} = useFetch(true);


    useEffect(async () => {
        const {res} = await request('/api/score');
        console.log('aaa res; ', res.score);
        setScore(res.score);
    }, [location])
    return (<>
        <span className="navbar-text navbar-item pe-3">
            Hi {username}, you have {score} points
        </span>
    </>)
}


const NavBar = ({ username }) => {

    const {onLoggedOut} = useContext(AuthContext);


    const logout = (e) => {
        e.preventDefault();
        onLoggedOut();
    }

    return (
        <nav className="navbar navbar-expand" style={{backgroundColor: 'rgb(117, 71, 71)'}}>
            <div className='container-fluid'>
                <span className="navbar-brand navbar-item">CTF board</span>

                <ul className="navbar-nav  mr-auto">
                    <li className="nav-item nav">
                        <NavLink className="nav-link navbar-link" to="/tasks">Tasks</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link navbar-link" to="/scoreboard">Score board</NavLink>
                    </li>
                </ul>
                <div>
                    <Score username={username}/>
                    <button className="btn nav-item navbar-link" type="button" onClick={logout} style={{marginTop: '-6px'}}>Logout</button>
                </div>


            </div>
        </nav>
    )
}

export default NavBar
