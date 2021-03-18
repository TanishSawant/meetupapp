import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
import Listitem from './Listitem'
import axios from 'axios'

const base = axios.create({
    baseURL: 'http://localhost:8000/'
})

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

function List_events() {

    const [events, setEvents] = useState([])

    const classes = useStyles();
    useEffect(() => {
        async function getEvents() {
            const request = base.get('/events')
            .then((request) =>{
                // console.log(request.data);
                setEvents(request.data);
            });
            console.log("Hello");
            console.log(events);
            return request;
        };
        getEvents();
    }, [])

    return (
        <List className={classes.root}>
            {events.map((event) => (
                <Listitem event={event}/>
            ))}
        </List>
    )
}

export default List_events
