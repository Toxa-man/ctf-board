import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ErrorBar from './ErrorBar';
import LoadingBar from './LoadingBar';
import { useFetch } from './useFetch';
import './TasksPage.css'


const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const {request, loading, error, setError} = useFetch(true);
    useEffect(() => {
        const timer = setTimeout(() => setError(false), 5000);
        const fetchAsync = async () => {
            const {res} = await request('/api/tasks', 'GET');
            setTasks(res);
        }
        fetchAsync();
        return () => clearTimeout(timer);
    }, [])

    return (
        <>
        {error && <ErrorBar text={error}/>}
        {loading && <LoadingBar/>}
        {!error && <div className='m-3' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 300px', gap: '5px' }}>
            {tasks.map(task => {
                return <Task key={task._id} {...task} />
            })}
        </div>}
        </>

    )
}

const Task = ({ _id, name, category, reward, solved }) => {
    return (
        <>
            <Link to={`/tasks/${_id}`} style={{ textDecoration: 'none', textDecorationColor: 'none' }}>
                <div className={`px-2 task ${solved && 'solved'}`}>
                    <h1 style={{fontSize: 'calc(0.7vw + 1vh + 1vmin)'}}>{name}</h1>
                    <h4>{category}</h4>
                    <h4>
                        <p className='text-end'>{reward}pts</p>
                    </h4>
                </div>
            </Link>
        </>

    )
}

export default TasksPage
