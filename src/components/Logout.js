import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../Firebase'
import ReactTooltip from 'react-tooltip';

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
            <label className="switch">
                <input type="checkbox" onChange={ handleChange } />
                <span className="slider round" checked={ checked } data-tip="Déconnexion"></span>
            </label>
            <ReactTooltip place="left" type="dark" effect="solid"/>
        </div>
    )

}

export default Logout