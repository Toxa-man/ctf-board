import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './AuthPage.css'
import ErrorBar from './ErrorBar'
import LoadingBar from './LoadingBar'
import { useFetch } from './useFetch'

const AuthPage = ({onLoggedIn}) => {

    const {request, loading, error, setError} = useFetch(false);
    const navigate = useNavigate();
    
    const onSubmit = async (username, password) => {
        const {success, res} = await request('/api/auth', 'POST', {username: username, password: password});
        setTimeout(() => setError(false), 5000);
        if (!success) {
            return;
        }
        onLoggedIn(res.token, username, res.userId);
        navigate('/tasks');
    }


    return (
        <div>
            <div className='auth-form'>
                <div className='mx-auto' style={{ minWidth: 250, maxWidth: 600}}>
                    {error && <ErrorBar text={error}/>}
                    <Header/>
                    <AuthForm {...{onSubmit, loading}}/>
                </div>
            </div>

        </div>

    )
}


const AuthForm = ({onSubmit, loading}) => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });




    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    


    return (
        <>
            <span>
                <form className="pt-3">
                    <div className="mb-3">
                        <label htmlFor="teamNameForm" className="form-label">Team name</label>
                        <input type="text" className="form-control" id="teamNameForm" name='username' onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordForm" className="form-label">Password</label>
                        <input type="password" className="form-control" id="passwordForm" name='password' onChange={onChange}/>
                    </div>
                    {!loading ? <button type="submit" className="btn btn-secondary mb-2" onClick={(e) => {e.preventDefault(); onSubmit(formData.username, formData.password)}}>Login</button> : <LoadingBar/>}
                </form>
            </span>

        </>
    )
}

const Header = () => {
    return (
        <>
            <div className="mx-auto pt-2" style={{ minWidth: 250, maxWidth: 600}}>
                <h2> Welcome to CTF board, please log in or <Link to='/register'>register</Link></h2>
            </div>
            
        </>
    )
}

export default AuthPage
