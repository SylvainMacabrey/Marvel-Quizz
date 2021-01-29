import React from 'react'
import batman from '../images/batman.png'

const centerH2 = {
    textAlign: 'center',
    marginTop: '50px'
}

const centerImg = {
    display: 'block',
    margin: '40px auto'
}

const ErrorPage = () => {
    return (
        <div className="quiz-bg">
            <div className="container">
                <h2 style={ centerH2 }>Oups, cette page n'exispe pas.</h2>
                <img style={ centerImg } src={ batman } alt="errorpage"/>
                <h2 style={ centerH2 }>Non, mais Batman c'est pas Marvel.</h2>
            </div>
        </div>
    )
}

export default ErrorPage
