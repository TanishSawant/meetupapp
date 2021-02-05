import React from 'react'
import ImgMediaCard from '../SimpleCard'
import {useAuth} from '../../AuthContext'

const styles = {
    card: {
        paddingTop: '10px',
        height: '100vh'
    },
    main : {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
}

function Profile() {
    const {currentUser} = useAuth();
    return (
        <div style={styles.main}>
            <ImgMediaCard
                style={styles.card}
                email = {currentUser.email}
            />
        </div>
    )
}

export default Profile
