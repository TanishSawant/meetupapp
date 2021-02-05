import React from 'react'
import {Container} from '@material-ui/core'
import {useAuth} from '../../AuthContext'


function Landing() {
    const {currentUser} = useAuth();
    return (
        <div>
            <Container>
                <h1>Welcome!</h1>
            </Container>
        </div>
    )
}

export default Landing
