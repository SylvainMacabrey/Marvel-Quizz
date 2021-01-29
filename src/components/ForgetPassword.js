import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'


const ForgetPassword = (props) => {

    const firebase = useContext(FirebaseContext);

    const [ email, setEmail ] = useState('')
    const [ success, setSuccess ] = useState(null)
    const [ error, setError ] = useState('')

    const successStyle = {
        border: '1px solid green',
        background: 'green',
        color: 'white'
    }

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        firebase.passwordReset(email)
        .then(() => {
            setError('')
            setSuccess(`Consulter votre email ${ email } pour changer le mot de passe`)
            setEmail('')
            setTimeout(() => {
                props.history.push('/login')
            }, 3000)
        })
        .catch(error => {
            setEmail('')
            setError(error);
        })
    }

    const btn = email === '' ? <button disabled>Inscription</button> : <button>Connexion</button>

    const errorMsg = error !== '' && <span>{ error.message }</span>;

    const successMsg = success && <span style={ successStyle }>{ success }</span>

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
            <div className="formBoxLeftForget"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        { errorMsg }
                        { successMsg }
                        <h2>Mot de passe oublié ?</h2>
                        <form onSubmit={ handleSubmit }>
                            <div className="inputBox">
                                <input onChange={ handleEmail } value={ email } type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            { btn }
                            <div className="linkContainer">
                                <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous...</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ForgetPassword
