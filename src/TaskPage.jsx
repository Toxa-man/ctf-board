import React from 'react'

const TaskPage = (props) => {
    return (
        <div className='m-3'>
            <Task {...props}/>
            <SubmitForm {...props}/>
        </div>
    )
}

const Task = ({ id, name, text }) => {
    return <>
        <h1>{name}</h1>
        <p>{text}</p>
    </>
}

const SubmitForm = ({ id }) => {
    return <>
        <form>
            <div className="form-group pb-3">
                <label htmlFor="answerForm">Your answer</label>
                <input type="email" className="form-control" id="answerForm" style={{width: '45%'}}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
}

export default TaskPage
