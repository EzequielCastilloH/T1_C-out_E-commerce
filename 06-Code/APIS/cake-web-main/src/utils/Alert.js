import React from 'react'
import Alert from '@mui/material/Alert';

const Notification = (props) => {
    const {message, type} = props

    return(
        <Alert severity={type}>{message}</Alert>
    )
}

export default Notification