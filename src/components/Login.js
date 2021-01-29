import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'

const Login = (props) => {

    const firebase = useContext(FirebaseContext);

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        firebase.loginUser(email, password)
        .then(user => {
            setEmail('')
            setPassword('')
            props.history.push('/welcome');
        })
        .catch(error => {
            setEmail('')
            setPassword('')
            setError(error);
        })
    }

    const btn = email === '' || password === '' ? <button disabled>Inscription</button> : <button>Connexion</button>

    const errorMsg = error !== '' && <span>{ error.message }</span>;

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
            <div className="formBoxLeftLogin"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {errorMsg}
                        <h2>Connexion</h2>
                        <form onSubmit={ handleSubmit }>
                            <div className="inputBox">
                                <input onChange={ handleEmail } value={ email } type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={ handlePassword } value={ password } type="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            { btn }
                            <div className="linkContainer">
                                <Link className="simpleLink" to="/signup">Nouveau sur Marvel Quiz ? Inscrivez vous.</Link>
                                <br />
                                <Link className="simpleLink" to="/forgetpassword">Mot de passe oublié.</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login
