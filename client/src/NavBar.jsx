import React, { useContext, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react';
import './NavBar.css'
import { AuthContext } from './AuthContext';
import { useFetch } from './useFetch';

const Score = ({ username }) => {
    const [score, setScore] = useState(null);
    const location = useLocation();
    const { request } = useFetch(true);

    useEffect(() => {
        const asyncFunc = async () => {
            const { res } = await request('/api/score');
            setScore(res.score);
        }
       asyncFunc();
    }, [location])
    return (<>
        <span className="navbar-text navbar-item pe-3">
            Hi {username}, you have {score} points
        </span>
    </>)
}

const NavButton = ({ to, capture }) => {
    const location = useLocation();
    return <>
        <li className="nav-item nav">
            <NavLink className={`${location.pathname === to ? 'current' : ''} navbar-link `} to={to}>{capture}</NavLink>
        </li>
    </>
}


const NavBar = ({ username }) => {

    const { onLoggedOut } = useContext(AuthContext);


    const logout = (e) => {
        e.preventDefault();
        onLoggedOut();
    }

    const location = useLocation();
    console.log(location);

    return (
        <nav className="navbar navbar-expand" style={{ backgroundColor: 'rgb(117, 71, 71)' }}>
            <div className='container-fluid'>
                <span className="navbar-brand navbar-item">CTF board</span>

                <ul className="navbar-nav  mr-auto">
                    <NavButton to='/tasks' capture='Tasks'/>
                    <NavButton to='/scoreboard' capture='Score board'/>
                </ul>
                <div>
                    <Score username={username} />
                    <button className="btn nav-item navbar-link" type="button" onClick={logout} style={{ marginTop: '-6px' }}>Logout</button>
                </div>


            </div>
        </nav>
    )
}

export default NavBar
