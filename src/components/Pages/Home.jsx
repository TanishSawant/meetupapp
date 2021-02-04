import React, {useEffect} from 'react'
import app from '../../../src/firebase'
import {Drawer, List, ListItemIcon, ListItemText, ListItem, Container, Typography} from "@material-ui/core/";
import {makeStyles} from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import '../../static/home.css'
import BgImage from '../../Assets/gettyimages-157334256-612x612.jpg'


const useStyles = makeStyles((theme)=>({
    main_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: '1',
    }
}))


export default function Home() {

    useEffect(() => {
        console.log(app);
      }, []);
    
    const classes = useStyles();
    
    return (
        <div className="main_container">
        <Container className={classes.main_container}>
            <Typography variant="h3" align="center" color="white">Make 2021 the year of re-connection</Typography>
        </Container>
        </div>
    )
}
