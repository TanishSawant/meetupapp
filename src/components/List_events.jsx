import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Listitem from './Listitem'

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
    const classes = useStyles();
    return (
        <List className={classes.root}>
        <Listitem/>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar
                avatarStyle='Circle'
                topType='LongHairStraight'
                accessoriesType='Blank'
                hairColor='BrownDark'
                facialHairType='Blank'
                clotheType='BlazerShirt'
                eyeType='Default'
                eyebrowType='Default'
                mouthType='Default'
                skinColor='Light'
            />
            </ListItemAvatar>
            <ListItemText
            primary="Brunch this weekend?"
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
            }
            />
            </ListItem>
        {/* 
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar
                avatarStyle='Circle'
                topType='LongHairStraight'
                accessoriesType='Blank'
                hairColor='BrownDark'
                facialHairType='Blank'
                clotheType='BlazerShirt'
                eyeType='Default'
                eyebrowType='Default'
                mouthType='Default'
                skinColor='Light'
                />
            </ListItemAvatar>
            <ListItemText
            primary="Summer BBQ"
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
            }
            />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar
                avatarStyle='Circle'
                topType='LongHairStraight'
                accessoriesType='Blank'
                hairColor='BrownDark'
                facialHairType='Blank'
                clotheType='BlazerShirt'
                eyeType='Default'
                eyebrowType='Default'
                mouthType='Default'
                skinColor='Light'
                />
            </ListItemAvatar>
            <ListItemText
            primary="Oui Oui"
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
            }
            />
        </ListItem> */}
        </List>
    )
}

export default List_events
