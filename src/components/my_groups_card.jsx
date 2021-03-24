import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useHistory, Link } from "react-router-dom";

const base = axios.create({
  baseURL: "http://localhost:8000/",
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

export default function MyGroupCard({ group, events }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  //   const {currentUser} = useAuth();
  const [user, setUser] = useState("");
  const history = useHistory();
  const { currentUser } = useAuth();
  // const [events, setEvents] = useState([]);
  useEffect(() => {
    setUser(currentUser.email);
    console.log("***************************");
    console.log(currentUser.email);
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  // useEffect(() => {
  //   // console.log()
  //   setEvents(group.events);
  // },[]);

  useEffect(() => {
    console.log("////////////////////////");
    console.log(events);
  }, []);

  const handleExpandClick = async () => {
    setExpanded(!expanded);
  };
  const deleteGroup = (e) => {
    e.preventDefault();
    const params = [group.id];
    const result = base
      .post(`/groups_123/delete/${group.id}`, params)
      .then((response) => {
        console.log(response);
      });
    console.log("Delete group!!");
    history.push("/dashboard");
  };

  const leaveGroup = (e) => {
    e.preventDefault();
    const params = [group.id, user];
    const res = base
      .post(`/groups/${group.id}/leave-group/${currentUser.email}`, params)
      .then((resp) => {
        console.log(resp.data);
      });
    console.log("Leave group!!");
    history.push("/dashboard");
  };

  return (
    <div>
      {currentUser != undefined && (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {group.title.charAt(0)}
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
          {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
          <CardMedia
            className={classes.media}
            image={group.image}
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
                <br />
                {events ? (
                  events.map((event) => {
                    return (
                      <div>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/events/${event.id}`}
                        >
                          {event.title}
                        </Link>
                        <br />
                      </div>
                    );
                  })
                ) : (
                  <h3 color="red">No Events From This Group</h3>
                )}
                {group.Creator === currentUser.email ? (
                  <Button variant="outlined" onClick={deleteGroup}>
                    Delete Group
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    style={{ marginTop: "25px" }}
                    onClick={leaveGroup}
                  >
                    Leave Group
                  </Button>
                )}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </div>
  );
}
