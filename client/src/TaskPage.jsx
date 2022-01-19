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
            <SubmitForm {...{ id: id }} />
        </div>
    )
}

const Task = ({ id }) => {
    const [taskData, setTaskData] = useState(undefined);

    const { loading, error, request, setError } = useFetch(true);

    useEffect(() => {
        const asyncFetch = async () => {
            const { res } = await request(`/api/tasks/${id}`);
            if (!error) {
                setTaskData(res);
            }
        }
        asyncFetch();
        const timer = setTimeout(() => setError(false), 5000);
        return () => clearTimeout(timer);
    }, []);
    if (taskData && taskData.name === "Search more" && !document.getElementsByTagName('head')[0].innerHTML.includes('BOTTLENECK')) {
        document.getElementsByTagName('head')[0].appendChild(document.createComment("IAMTHEBOTTLENECK is what you're searching for"));
    }

    return <>
        {loading && <LoadingBar />}
        {error && <ErrorBar text={error} />}
        {taskData && <TaskInfo {...taskData}/>}
        {taskData && taskData.attachments && <Attachments {...taskData}/>}
    </>
}

const TaskInfo = ({name, category, reward, description}) => {
    return (<>
        <h1 >{name}</h1>
        <h2 className='hash-line'>#{category} #{reward}</h2>
        <p className='mt-3'>{description}</p>
    </>);
}

const Attachments = ({ attachments }) => {
    return <div>
        <hr style={{ width: '45%' }} />
        <h4>Attachments:</h4>
        {attachments.map(value => {
            if (value.type === "file") {
                return <p><Link key={value.url} className='attach-link' target='_blank' download to={value.url}>{value.name}</Link></p>
            } else if (value.type === 'link') {
                return <p><Link key={value.url} className='attach-link' to={{ pathname: value.url }} target="_blank">{value.name}</Link></p>
            }
            return <></>;

        })}
    </div>
}

const SubmitForm = ({ id }) => {

    const [answer, setAnswer] = useState('');

    const handleChange = (e) => {
        setAnswer(e.target.value);
    }

    const [gaveRightAnswer, setGaveRightAnswer] = useState(false);

    const { loading, request, error, setError } = useFetch(true);


    const onSubmit = async (e) => {
        e.preventDefault();
        const { success } = await request('/api/tasks/submit', 'POST', { taskId: id, answer: answer });
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
                <label className='mb-2' htmlFor="answerForm">Your answer:</label>
                <input type='text' className="form-control" id="answerForm" style={{ width: '45%' }} onChange={handleChange} />
            </div>
            {id !== '61e4af705a00169963223029' && (!loading ? <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button> : <LoadingBar />)}
            {error && <div className="alert alert-danger my-2" style={{ width: '45%', height: '30%' }} role="alert">
                <span>{error}</span>
            </div>}
        </form>
    </>
}

export default TaskPage
