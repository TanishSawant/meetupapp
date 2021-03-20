import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const styles = {
  main: {
    borderTop: "1px solid lightgrey",
    borderBottom: "1px solid lightgrey",
    minHeight: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFEF",
  }
};

function Listitem({ event }) {
  const classes = useStyles();
  console.log(event.id);
  return (
    <div style={styles.main}>
      <div>
        <h1>{event.title}</h1>
        <div>
          <p>Topic: <b >{event.topic}</b></p>
        </div>
        <p><b>Description: </b> {event.description}</p>
        <Link to={`/events/${event.id}`}>See the Details</Link>
      </div>
    </div>
  );
}

export default Listitem;
