import React from 'react'

import './ErrorBar.css'

const ErrorBar = ({text}) => {
    return (
        <div className="alert alert-danger " style={{border: '1px solid black'}} role="alert">
            Error has occured: {text}
        </div>
    );

}

export default ErrorBar
