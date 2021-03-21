import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import axios from "axios"
import {useAuth} from '../AuthContext'
import {useHistory} from 'react-router-dom'

const base = axios.create({
    baseURL: 'http://localhost:8000/'
});


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    backgroundColor: "greywhite",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function GroupCard({ group }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
//   const {currentUser} = useAuth();
  const [user, setUser] = useState("");
  const history = useHistory();
  const {currentUser} = useAuth();

  useEffect(() => {
    setUser(currentUser.email);
    console.log("***************************");
    console.log(currentUser.email);
  });
  useEffect(() => {
    console.log(user);
  }, [user])

  const joinGroup = (e) => {
    e.preventDefault();
    const params = [group.id, user]
    base.post(`groups/${group.id}/${user}`, params)
    console.log("Joined group!!")
    // window.location.reload();
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (    
    <div>
    {currentUser != undefined &&
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {/* {group.title.charAt(0)} */}R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={group.title}
        subheader={`created by ${group.Creator}`}
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {group.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b>Topic:</b> {group.topic}
          </Typography>
            {!group.members.includes(user) && <Button variant="outlined" onClick={joinGroup}>
                Join Group as {user}
            </Button>
            }
            {group.members.includes(user) && 
                <p style={{color: 'green'}}>You are already a member of this group!</p>
            }
        </CardContent>
      </Collapse>
    </Card>}
    </div>
  );
}
