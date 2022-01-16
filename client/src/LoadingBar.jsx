import React from 'react'

import spinner from './img/spinner.gif'

const LoadingBar = () => {
    return (
        <div>
            <Loading/>
        </div>
    );
}

const Loading = () => {
    return (
        <>
            <img src={spinner} style={{width: '70px', height: 'auto'}} className='mx-auto' alt={'Loading...'}/>
        </>
    )
}


export default LoadingBar
