import { useContext, useState, useCallback } from "react"
import { AuthContext } from "./AuthContext";

export const useFetch = (withAuth) => {
    const { onLoggedOut, userId, token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (url, method = 'GET', body = null) => {
        try {
            setLoading(true);
            const queryString = withAuth ? `?userId=${encodeURIComponent(userId)}` : '';
            const response = await fetch(`${url}${queryString}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    ...token && withAuth ? { Authorization: `Bearer ${token}` } : {},
                },
                ...body? {body: JSON.stringify(body)} : {}
            });
            setLoading(false);
            if (response.status === 401) {
                onLoggedOut();
                return {success: false, res: null};
            }
            if (response.status !== 200) {
                const res = await response.json();
                setError(`${res.message}`);
                return {success: false, res: null};
            }
            const res = await response.json();
            return {success: true, res: res};
        } catch (e) {
            setError(e.message);
            setLoading(false);
            return {success: false, res: null};
        }
    };


    return {request, loading, error, setError};
}

