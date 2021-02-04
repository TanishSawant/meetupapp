import React, {useEffect} from 'react'
import app from '../../../src/firebase'
import {Drawer, List, ListItemIcon, ListItemText, ListItem, Container} from "@material-ui/core/";
import {makeStyles} from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    main_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: '1'
    }
}))


export default function Home() {

    useEffect(() => {
        console.log(app);
      }, []);
    
    const classes = useStyles();
    
    return (
        <Container className={classes.main_container}>
            <h1>Home Page</h1>
        </Container>
    )
}
