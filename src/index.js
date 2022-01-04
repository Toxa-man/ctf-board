import React, {useState} from 'react';
import ReactDom from 'react-dom';
import AuthPage from './AuthPage';
import NavBar from './NavBar';
import TaskPage from './TaskPage';
import TasksPage from './TasksPage';

const task = {
    id: 1,
    name: 'Blue line',
    text: 'Each pixel of <a href = "image.png">this picture</a> mean something...but what? Your task is to find out what they mean together.'
}

const MainPage = () => {
    return (
        <>
            <NavBar name={"test team"} score={112}/>
            <TaskPage {...task}/>
        </>
    )
}

ReactDom.render(<MainPage />, document.getElementById('root'));