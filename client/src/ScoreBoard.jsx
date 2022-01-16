import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import LoadingBar from './LoadingBar'
import { useFetch } from './useFetch'
const data = [{
    teamName: 'team1',
    score: '56'
},
{
    teamName: 'team2',
    score: '57'
},
{
    teamName: 'team3',
    score: '123'
},
{
    teamName: 'team4',
    score: '653'
}]

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
    useEffect(async () => {
        const {res} = await request('/api/score/board');
        if (!error) {
            setTeamsData(res);
        }
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
