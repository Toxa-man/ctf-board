import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom';
import ErrorBar from './ErrorBar';
import LoadingBar from './LoadingBar';
import { useFetch } from './useFetch';

import './TaskPage.css'

const TaskPage = () => {
    const { id } = useParams();
    return (
        <div className='m-3'>
            <Task {...{ id: id }} />
            <hr style={{ width: '45%' }} />
            <SubmitForm {...{id: id}}/>
        </div>
    )
}

const Task = ({ id }) => {
    const [taskData, setTaskData] = useState(undefined);

    const { loading, error, request, setError } = useFetch(true);

    useEffect(async () => {
        const { res } = await request(`/api/tasks/${id}`);
        setTimeout(() => setError(false), 5000);
        if (!error) {
            setTaskData(res);
        }
    }, []);

    return <>
        {loading && <LoadingBar />}
        {error && <ErrorBar text={error} />}
        {taskData && <div><h1>{taskData.name}</h1>
            <h2 className='hash-line'>#{taskData.category} #{taskData.reward}</h2>
            <p className='mt-3'>{taskData.description}</p></div>}
        <hr style={{ width: '45%' }} />
        {taskData && taskData.attachments &&
            <div>
                <h4>Attachments:</h4>
                {taskData.attachments.map(value => {
                    if (value.type === "file") {
                        return <Link className='attach-link' target='_blank' download to={value.url}>{value.name}</Link>
                    } else if (value.type === 'link') {
                        return <Link className='attach-link' to={{ pathname: value.url }} target="_blank">{value.name}</Link>
                    }
                    
                })}
            </div>}
    </>
}

const SubmitForm = ({ id }) => {

    const [answer, setAnswer] = useState('');

    const handleChange = (e) => {
        setAnswer(e.target.value);
    }

    const [gaveRightAnswer, setGaveRightAnswer] = useState(false);

    const { loading, request, error, setError} = useFetch(true);


    const onSubmit = async (e) => {
        e.preventDefault();
        const {success} = await request('/api/tasks/submit', 'POST', { taskId: id, answer: answer });
        if (success) {
            setGaveRightAnswer(true);
        }
        setTimeout(() => setError(false), 5000);
    }

    if (gaveRightAnswer) {
        return <>
            <Navigate to='/success' />
        </>
    }


    return <>
        <form autoComplete='off'>
            <div className="form-group pb-3">
                <label className='mb-2' htmlFor="answerForm">Your answer</label>
                <input type='text' className="form-control" id="answerForm" style={{ width: '45%' }} onChange={handleChange} />
            </div>
            {!loading ? <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button> : <LoadingBar/>}
            {error && <div class="alert alert-danger my-2" style={{ width: '45%', height: '30%' }} role="alert">
                <span>{error}</span>
            </div>}
        </form>
    </>
}

export default TaskPage
