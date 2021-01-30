import React, { Fragment } from 'react'

const Loader = ({ msg, style}) => {
    return (
        <Fragment>
            <div className="loader"></div>
            <p style={ style }>{ msg }</p>
        </Fragment>
    )
}

export default Loader
