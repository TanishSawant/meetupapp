import React from 'react'
import {Container} from '@material-ui/core'
import {useAuth} from '../../AuthContext'


function Landing() {
    const {currentUser} = useAuth();
    console.log(currentUser.email)
    return (
        <div>
            <h1>Welcome!</h1>
        </div>
    )
}

export default Landing
