import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export const Alert = ({ alert }) => {
    return (
        alert && (
        <div className={`alert alert-${alert.type}`}>
            <FontAwesomeIcon icon='info-circle' /> {alert.msg}            
        </div>
        )
    )
}
