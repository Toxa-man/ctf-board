import React, { useEffect } from 'react'

import './ErrorBar.css'

const ErrorBar = ({text, clearError}) => {
    useEffect(() => {
        const timer = setTimeout(clearError, 5000);
        return () => clearTimeout(timer);
    });
    return (
        <div className="alert alert-danger " style={{border: '1px solid black'}} role="alert">
            Error has occured: {text}
        </div>
    );

}

export default ErrorBar
