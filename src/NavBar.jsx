import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react';
import './NavBar.css'

const Score = ({teamName}) => {
    const [score, setScore] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const score = "515";
        setScore(score);
    }, [location])
    return (<>
        <span className="navbar-text navbar-item pe-3">
            Hi {teamName}, you have {score} points
        </span>
    </>)
}

const NavBar = ({ teamName, onLoggedOut }) => {

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
                    <Score teamName={teamName}/>
                    <button className="btn nav-item navbar-link" type="button" onClick={logout} style={{marginTop: '-6px'}}>Logout</button>
                </div>


            </div>
        </nav>
    )
}

export default NavBar
