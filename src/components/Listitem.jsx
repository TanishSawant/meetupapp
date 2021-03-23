import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    paddingTop: '1%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const styles = {
  main: {
    // minWidth: '600px',
    borderTop: "1px solid lightgrey",
    borderBottom: "1px solid lightgrey",
    minHeight: "15%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    wrap: 'wrap',
    textSize: "1rem"
  },

  outer: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "spaceBetween",
    // alignItems: "center",
  }
};

function Listitem({ event }) {
  const classes = useStyles();
  console.log(event.id);
  return (
    <div style={styles.outer}>
      {event.image? 
      //250, 200
      <img src={event.image} alt="" srcset="" width="26%" height="23%" style={{borderRadius: "15px", margin: "15px"}}/>
        : <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX//wCKxvRFAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC" alt="" srcset="" width="250px" height="200px" style={{borderRadius: "15px", margin: "15px"}}/>
    }
    <div style={styles.main}>
      <div>
        <h1>{event.title}</h1>
        <div>
          <p>Topic: <b >{event.topic}</b></p>
        </div>
        <Link to={`/events/${event.id}`} style={{textDecoration: 'none'}}>See the Details</Link>
      </div>
    </div>
    </div>
  );
}

export default Listitem;
