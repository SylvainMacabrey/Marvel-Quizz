import React, { Component, Fragment } from 'react'
import Levels from './Levels'
import ProgressBar from './ProgressBar'
import { QuizMarvel }  from './QuizMarvel'
import QuizOver from './QuizOver'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaChevronRight } from 'react-icons/fa'

toast.configure()

class Quiz extends Component {

    constructor(props) {
        super(props)
        this.initialState = {
            levelNames: ['debutant', 'confirme', 'expert'],
            quizLevel: 0,
            maxQuestions: 10,
            storedQuestions: [],
            question: null,
            options: [],
            idQuestion: 0,
            btnDisabled: true,
            userAnswer: null,
            score: 0,
            showWelcomeMsg: false,
            quizEnd: false
        }
      this.state = this.initialState
      this.storedDataRef = React.createRef()
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.storedQuestions !== prevState.storedQuestions && this.state.storedQuestions.length) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }
        if(this.state.idQuestion !== prevState.idQuestion && this.state.storedQuestions.length) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: false
            })
        }
        if(this.props.userData.pseudo !== prevProps.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo)
        }
        if(this.state.quizEnd !== prevState.quizEnd) {
            const gradepercent = this.getPercentage(this.state.maxQuestions, this.state.score)
            this.gameOver(gradepercent)
        }
    }

    submitAnswer = (option) => {
        this.setState({ userAnswer: option, btnDisabled: false })
    }

    nextQuestion = () => {
        if(this.state.idQuestion === this.state.maxQuestions - 1) {
            this.setState({ quizEnd: true })
        } else {
            this.setState(prevState => ({ idQuestion: prevState.idQuestion + 1 }))
        }
        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer
        if(this.state.userAnswer === goodAnswer) {
            this.setState(prevState => ({ score: prevState.score + 1 }))
            toast.success('Bravo, +1 point', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                bodyClassName: 'toastify-color'
            });
        } else {
            toast.error('Raté, mauvaise réponse', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                bodyClassName: 'toastify-color'
            });
        }
    }

    showToastMsg = (pseudo) => {
        if(!this.state.showWelcomeMsg) {
            this.setState({ showWelcomeMsg: true })
            toast.warn(`Bienvenu ${ pseudo }`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    getPercentage = (maxQuest, score) => (score / maxQuest) * 100

    gameOver = (gradepercent) => {
        if(gradepercent >= 50) {
            this.setState({ 
                quizLevel: this.state.quizLevel + 1,
                percent: gradepercent,            
            })
        } else {
            this.setState({ 
                percent: gradepercent,
            })
        }
    }

    loadLevelQuestions = (param) => {
        this.setState({ ...this.initialState, quizLevel:  param})
        this.loadQuestions(this.state.levelNames[param])
    }

    loadQuestions = level => {
        const questions = QuizMarvel[0].quizz[level]
        if(questions.length >= this.state.maxQuestions) {
            this.storedDataRef.current = questions
            const newQuestions = questions.map(({answer, ...keepRest}) => keepRest)
            this.setState({ storedQuestions: newQuestions })
        } else {
            console.log("Pas assez de question")
        }
    }

    render() {
        const dispalyOptions = this.state.options.map((option, index) => {
            return (
                <p key={ index } className={ `answerOptions ${this.state.userAnswer === option ? "selected" : "" }`} onClick={() => this.submitAnswer(option)}>
                    <FaChevronRight />{ option }
                </p>
            )
        })
        return this.state.quizEnd ? (
            <QuizOver ref={ this.storedDataRef } 
                      levelNames={ this.state.levelNames } 
                      quizLevel={ this.state.quizLevel } 
                      score={ this.state.score } 
                      maxQuestions={ this.state.maxQuestions } 
                      percent={ this.state.percent }
                      loadLevelQuestions={ this.loadLevelQuestions }
            />
        ) : (
            <Fragment>
                <Levels levelNames={ this.state.levelNames } quizLevel={ this.state.quizLevel }/>
                <ProgressBar idQuestion={ this.state.idQuestion } maxQuestions={ this.state.maxQuestions }/>
                <h2>{this.state.question}</h2>
                { dispalyOptions }
                <button disabled={ this.state.btnDisabled } className="btnSubmit" onClick={ this.nextQuestion }>
                    { this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminé" }
                </button>
            </Fragment>
        )
    }
    
}

export default Quiz
