//message popping on screen when something is wrong
import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({variant, children}) =>{
    return <Alert variant = {variant}>
        {children}
    </Alert>
}
Message.defaultProps = {
    variant: 'info'   //blue color varient
}

export default Message