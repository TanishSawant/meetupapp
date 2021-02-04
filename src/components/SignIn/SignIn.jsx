import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme)=>({
    main_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: '1'
    }
}))


function SignIn() {
    const classes = useStyles();
    return (
        <div className={classes.main_container}>
            <h2>SignIn</h2>
        </div>
    )
}

export default SignIn
