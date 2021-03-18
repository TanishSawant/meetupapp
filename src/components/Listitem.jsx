import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


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

  const styles = {
      item_image: {
        // width:'10%'
    },
    main:{
        borderTop: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
        minHeight: '20%',
        display: 'flex',
        justifyContent: 'space-evenly'
    }
  }

function Listitem({event}) {
    const classes = useStyles();
    return (
        <div style={styles.main}>
            <div style={styles.item_image}>
                {/* <img width="170px" height="100px" src="https://img.pngio.com/events-png-15-clip-arts-for-free-download-on-een-2019-event-png-342_147.png" alt=""/> */}
            </div>
            <div>
                <h1>{event.title}</h1>
                <p>{event.topic}</p>
                <p>Host: {event.host}</p>
            </div>
        </div>
    )
}


export default Listitem
