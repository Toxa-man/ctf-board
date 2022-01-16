import { Route, Routes } from "react-router-dom"
import AuthPage from './AuthPage';
import NavBar from './NavBar';
import RegisterPage from "./RegisterPage";
import ScoreBoard from "./ScoreBoard";
import TaskPage from './TaskPage';
import TasksPage from './TasksPage';
import { Navigate } from "react-router-dom";
import SuccessPage from "./SuccessPage";

export const useRoutes = (isAuthenticated, username, onLoggedIn) => {
    if (isAuthenticated) {
        return (<>
            <NavBar username={username} />
            <Routes>
                <Route path='/tasks' exact element={<TasksPage />} />
                <Route path='/scoreboard' element={<ScoreBoard/>}/>
                <Route path='/tasks/:id' element={<TaskPage />} />
                <Route path='/success' element={<SuccessPage />} />
                <Route path='*' element={<Navigate to='/tasks'/>} />
            </Routes>
        </>)
    }
    return (
        <>
        <Routes>
            <Route path='/auth' element={<AuthPage onLoggedIn={onLoggedIn}/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='*' element={<Navigate to='/auth'/>}></Route>
        </Routes>
        </>
    )
}