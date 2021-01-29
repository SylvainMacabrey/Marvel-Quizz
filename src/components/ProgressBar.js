import React, { Fragment } from 'react'

const ProgressBar = ({ idQuestion, maxQuestions }) => {

    const getPourcent = (totalQuestions, idQuestion) => {
        return ((100 / totalQuestions) * idQuestion)
    }

    return (
        <Fragment>
            <div className="percentage">
                <div className="progressPourcent">{`Questions: ${ idQuestion + 1 }/ ${ maxQuestions }`}</div>
                <div className="progressPourcent">{`Progression: ${ getPourcent(maxQuestions, idQuestion) } %`}</div>
            </div>
            <div className="progressBar">
                <div className="progressBarChange" style={{ width: `${ getPourcent(maxQuestions, idQuestion) }%` }}></div>
            </div>
        </Fragment>
    )

}

export default React.memo(ProgressBar)
