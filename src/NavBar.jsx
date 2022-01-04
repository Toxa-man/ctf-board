import React from 'react'

const NavBar = ({ name, score }) => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className='container-fluid'>
                <a className="navbar-brand" href="#">CTF board</a>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Tasks</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Score board</a>
                    </li>
                </ul>
                <div>
                    <span className="navbar-text pe-3">
                        Hi {name}, you have {score} points
                    </span>
                        
                    <button className="btn nav-item" type="button">Logout</button>
                </div>


            </div>
        </nav>
    )
}

export default NavBar
