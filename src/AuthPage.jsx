import React from 'react'
import { useState } from 'react'
import './AuthPage.css'

const AuthPage = (props) => {
    return (
        <div>
            <div className='mx-auto auth-form'>
                <Header/>
                <AuthForm {...props}/>
            </div>
        </div>

    )
}


const AuthForm = ({onLoggedIn}) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        await new Promise(r => setTimeout(r, 1500));
        console.log('here');
        onLoggedIn('tokenabc', 'test team name', '1');
    }

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })


    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    


    return (
        <>
            <span>
                <form className="container-fluid pt-3" style={{ minWidth: 250, maxWidth: 600}}>
                    <div className="mb-3">
                        <label htmlFor="teamNameForm" className="form-label">Team name</label>
                        <input type="text" className="form-control" id="teamNameForm" name='username' onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordForm" className="form-label">Password</label>
                        <input type="password" className="form-control" id="passwordForm" name='password' onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-secondary m-2" onClick={onSubmit}>Login</button>
                </form>
            </span>

        </>
    )
}

const Header = () => {
    return (
        <>
            <div className="mx-auto pt-2" style={{ minWidth: 250, maxWidth: 600}}>
                <h2> Welcome to CTF board, please log in</h2>
            </div>
            
        </>
    )
}

export default AuthPage
