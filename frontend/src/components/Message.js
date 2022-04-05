//message popping on screen when something is wrong
import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({varient, children}) =>{
    return <Alert varient = {varient}>
        {children}
    </Alert>
}
Message.defaultProps = {
    varient: 'info'   //blue color varient
}

export default Message