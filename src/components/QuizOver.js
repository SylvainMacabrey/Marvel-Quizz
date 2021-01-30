import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi'
import Loader from './Loader'
import Modal from './Modal'
import axios from 'axios'

const QuizOver = React.forwardRef((props, ref) => {

    const { levelNames, quizLevel, score, maxQuestions, percent, loadLevelQuestions } = props

    const [asked, setAsked] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [characterData, setChracterData] = useState([])
    const [loading, setLoading] = useState(true)

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const hash = 'a51cd318611852ed3f914062aec34cc0'

    useEffect(() => {
        setAsked(ref.current)
    }, [ref])

    const showModal = (id) => {
        setOpenModal(true)
        axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
        .then(response => {
            setChracterData(response.data)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }

    const hideModal = () => {
        setOpenModal(false)
        setLoading(true)
    }

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
                    <td><button className="btnInfo" onClick={ () => showModal(a.heroId) }>Infos</button></td>
                </tr>
            )
        })
    ) : (
        <tr>
            <td colSpan="3">
                <Loader msg={ "Recommencer le niveau" } style={{ textAlign: 'center', color: 'red' }}/>
            </td>
        </tr>
    )

    const resultModal = !loading ? (
        <Fragment>
            <div className="modalHeader">
                <h2>{ characterData.data.results[0].name }</h2>
            </div>
            <div className="modalBody">
                <h3>Sous titre</h3>
            </div>
            <div className="modalFooter">
                <button className="modalBtn">Fermer</button>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className="modalHeader">
                <h2>Réponse de Marvel API</h2>
            </div>
            <div className="modalBody">
                <Loader msg={ "En attente ... " } style={{ textAlign: 'center', color: 'red' }} />
            </div>
        </Fragment>
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
            <Modal openModal={ openModal } hideModal={ hideModal }>
                { resultModal }
            </Modal>
        </Fragment>
    )

})

export default React.memo(QuizOver)
