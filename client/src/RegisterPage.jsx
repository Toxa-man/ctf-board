import React from 'react'
import { useState, useEffect } from 'react'
import ErrorBar from './ErrorBar'
import LoadingBar from './LoadingBar'

import './RegisterPage.css'
import { useFetch } from './useFetch'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className="mx-auto pt-2">
                <h2> Please register or <Link to={'/auth'}>sign in</Link></h2>
            </div>

        </>
    )
}


const Form = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const onChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const [contests, setContests] = useState([]);

    const { error, request} = useFetch(false);

    const [selectedContest, setSelectedContest] = useState('');

    useEffect(() => {
        const asyncFunc = async() => {
            const { res } = await request('/api/contests');
            if (error) {
                return;
            }
            setContests(res);
            setSelectedContest(res[0].name);
        }
        asyncFunc();
    }, []);

    const handleContestChange = (e) => {
        setSelectedContest(e.target.value);
    }


    return (
        <div>
            <span>
                <form className="mx-auto pt-3">
                    <div className="mb-3">
                        <label htmlFor="teamNameForm" className="form-label">Team name</label>
                        <input type="text" className="form-control" id="teamNameForm" name='username' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordForm" className="form-label">Password</label>
                        <input type="password" className="form-control" id="passwordForm" name='password' onChange={onChange} />
                    </div>
                    {!error ? <div>
                    <label htmlFor="contestSelector" className="form-label">Contest</label>
                        <select id="contestSelector" className="form-select mb-3" aria-label="Contest" value={selectedContest} onChange={handleContestChange}>
                            {contests.map((contest) => {
                                return <option key={contest._id} value={contest.name}>{contest.name}</option>;
                            })}
                        </select>
                    </div> : <ErrorBar text={error}/>}
                    {!loading ? <button type="button" className="btn btn-secondary mb-2" onClick={(e) => { e.preventDefault(); onSubmit(formData.username, formData.password, selectedContest) }}>Register</button> : <LoadingBar />}

                </form>
            </span>
        </div>
    )
}

const RegisterPage = () => {

    const { request, loading, error, setError } = useFetch(false);
    const [successReg, setSuccessReg] = useState(false);

    const onSubmit = async (username, password, contestName) => {
        setTimeout(() => setError(null), 5000);
        if (!username) {
            setError('Username should not be empty');
            return;
        }
        if (!password) {
            setError('Password should not be empty');
            return;
        }
        const { success } = await request('/api/register', 'POST', { username, password, contestName });
        setSuccessReg(success);

    }
    return (<div className='reg-form'>
        <div className='mx-auto' style={{ minWidth: 250, maxWidth: 600 }}>
            {error && <ErrorBar text={error} />}
            <Header />
            <Form {...{ onSubmit, loading }} />
            {successReg && <span className='mb-2'>You have succeffully registered, you can <Link to='/auth'> login</Link> now</span>}
        </div>

    </div>)
}

export default RegisterPage
