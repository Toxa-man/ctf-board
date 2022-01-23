import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import LoadingBar from './LoadingBar'
import { useFetch } from './useFetch'

const Row = ({ username, score, index, current }) => {
    return (<>
        <tr className={current ? 'table-active': 'false'}>
            <th scope="row">{index}</th>
            <td>{username}</td>
            <td>{score}</td>
        </tr>
    </>)
}

const ScoreBoard = () => {

    const {loading, error, request} = useFetch(true);
    const [teamsData, setTeamsData] = useState([]);
    useEffect(() => {
        const asyncFunc = async () => {
            const {res} = await request('/api/score/board');
            if (!error) {
                setTeamsData(res);
            }
        }
        asyncFunc();
    }, []);

    const {userId} = useContext(AuthContext);


    return (
        <div>
            {loading && <LoadingBar/>}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Team name</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {teamsData.map((team, index) => {
                        return <Row key={team._id} {...{...team, index: index + 1, current: team._id === userId}} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ScoreBoard
