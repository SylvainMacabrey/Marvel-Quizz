import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi'

const QuizOver = React.forwardRef((props, ref) => {

    const { levelNames, quizLevel, score, maxQuestions, percent, loadLevelQuestions } = props

    const [asked, setAsked] = useState([])

    useEffect(() => {
        setAsked(ref.current)
    }, [ref])

    if(score < maxQuestions / 2) {
        setTimeout(() => loadLevelQuestions(quizLevel), 3000)
    }

    const decision = score >= maxQuestions / 2 ? (
        <Fragment>
            <div className="stepsBtnContainer">
                {
                    quizLevel < levelNames.length ? (
                        <Fragment>
                            <p className="successMsg">Bravo, passez au niveau suivant</p>
                            <button className="btnResult success"  onClick={() => loadLevelQuestions(quizLevel) }>Niveau suivant</button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p className="successMsg"><GiTrophyCup size='50px' />Bravo, vous êtes un expert</p>
                            <button className="btnResult gameOver" onClick={() => loadLevelQuestions(0) }>Accueil</button>
                        </Fragment>
                    )
                }
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: { percent }%</div>
                <div className="progressPercent">Note: { score }/{ maxQuestions }</div>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className="stepsBtnContainer">
                <p className="failureMsg">Vous avez échoué !</p>
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: { percent }%</div>
                <div className="progressPercent">Note: { score }/{ maxQuestions }</div>
            </div>
        </Fragment>
    )

    const questionsAnswers = score >= maxQuestions / 2 ? (
        asked.map((a) => {
            return (
                <tr key={a.id}>
                    <td>{ a.question }</td>
                    <td>{ a.answer }</td>
                    <td><button className="btnInfo">Infos</button></td>
                </tr>
            )
        })
    ) : (
        <tr>
            <td colSpan="3">
                <div className="loader"></div>
                <p style={{ textAlign: 'center', color: 'red' }}>
                    Recommencer le niveau
                </p>
            </td>
        </tr>
    )

    return (
        <Fragment>
            { decision }
            <hr/>
            <p>Les questions aux questions posées:</p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>Informations</th>
                        </tr>
                    </thead>
                    <tbody>
                        { questionsAnswers }
                    </tbody>
                </table>
            </div>
        </Fragment>
    )

})

export default React.memo(QuizOver)
