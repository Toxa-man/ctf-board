import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const tasks = [{
    id: 1,
    name: "task1",
    category: "web",
    reward: 10,
    solved: false
},
{
    id: 2,
    name: "task2",
    category: "web",
    reward: 100,
    solved: true,
},
{
    id: 3,
    name: "task3",
    category: "misc",
    reward: 200,
    solved: true
},
{
    id: 4,
    name: "task3",
    category: "misc",
    reward: 200,
    solved: true
},
{
    id: 5,
    name: "task3",
    category: "misc",
    reward: 200,
    solved: true
},
{
    id: 6,
    name: "task3",
    category: "misc",
    reward: 200,
    solved: true
},
{
    id: 7,
    name: "task3",
    category: "misc",
    reward: 200,
    solved: true
}];

const TasksPage = () => {
    return (
        <div className='m-3' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 300px', gap: '5px' }}>
            {tasks.map((task, index) => {
                return <Task key={task.id} {...task} />
            })}
        </div>
    )
}




const Task = ({ id, name, category, reward, solved }) => {

    const [inside, setInside] = useState(false);

    const onMouseEnter = (e) => {
        setInside(true);
    }

    const onMouseLeave = (e) => {
        setInside(false);
    }
    return (
        <>
            <Link to={`/tasks/${id}`} style={{ textDecoration: 'none', textDecorationColor: 'none' }}>
                <div className="px-2"
                    style={{
                        color: 'rgb(31, 45, 61)',
                        outline: `grey solid ${inside ? 2 : 1}px`,
                        minWidth: '300px',
                        backgroundColor: solved ? 'lightgreen' : 'mintcream'
                    }}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}>
                    <h1>{name}</h1>
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
