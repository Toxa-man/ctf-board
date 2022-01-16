import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const storageKey = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    // const navigate = useNavigate();

    const onLoggedIn = async (token, username, userId) => {
        localStorage.setItem(storageKey, JSON.stringify({
            token: token,
            username: username,
            userId: userId
        }));
        setUsername(username);
        setUserId(userId);
        setToken(token);
    }

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem(storageKey));
            if (data.token && data.username && data.userId) {
                onLoggedIn(data.token, data.username, data.userId);
            }
        } catch (e) {

        }

    }, [])

    const onLoggedOut = () => {
        localStorage.removeItem(storageKey);
        setToken(null);
        setUsername(null);
        setUserId(null);
        console.log('aaaa logged out');
    }


    return {token, username, userId, onLoggedIn, onLoggedOut};
}