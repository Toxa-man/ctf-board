import React from 'react';
import Confetti from 'react-confetti'
import {useWindowSize} from './useWindowSize'

import './SuccessPage.css';

const SuccessPage = () => {

    const {width, height} = useWindowSize();

    return (
        <div className='container '>
            <h1 className='my-2 success text-center' >Congrats! Your answer is correct!</h1>
            <Confetti
                width={width}
                height={height}
            />
        </div>
    )
}

export default SuccessPage
