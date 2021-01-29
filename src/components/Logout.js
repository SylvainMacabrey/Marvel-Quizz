import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../Firebase'

const Logout = (props) => {

    const firebase = useContext(FirebaseContext);

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if(checked) {
            firebase.signoutUser()
        }
    }, [checked])

    const handleChange = e => {
        setChecked(e.target.checked)
    }

    return (
        <div className="logoutContainer">
            <span>Déconnection </span>
            <label className="switch">
                <input type="checkbox" onChange={ handleChange } />
                <span className="slider round" checked={ checked }></span>
            </label>
        </div>
    )

}

export default Logout