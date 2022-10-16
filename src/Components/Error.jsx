import React from 'react'
import 'remixicon/fonts/remixicon.css';
import PropTypes from 'prop-types'

const Error = ({mensaje}) => (
    <p className='alert danger'><i className="ri-error-warning-line right"></i>{mensaje}</p>
)

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}

export default Error;