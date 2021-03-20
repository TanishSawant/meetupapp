import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import axios from "axios";
import HideAppBar from "../../../CustomAppBar";
import { Button, Typography } from "@material-ui/core";
import {useAuth} from '../../../AuthContext'

const base = axios.create({
  baseURL: "http://localhost:8000/",
});

function EventDetails(props) {
  console.warn(props);
  const [event, setEvent] = useState({});
  const {currentUser} = useAuth();
  const history = useHistory();

  // async function getEvents() {
  //     const res = base.get(`/events/${props.match.params.id}`).then((res) => {
  //         // console.log(res.data);
  //         setEvent(res.data);
  //         console.log(event);
  //     });
  //     return event;
  // }

  useEffect(() => {
    async function getEvents() {
      const res = base.get(`events/${props.match.params.id}`).then((res) => {
        console.log(res.data);
        setEvent(res.data);
      });
      return res;
    }
    getEvents();
  }, []);

  useEffect(() => {
    console.log(event);
  }, [event]);


  const joinEvent = (e) => {
    e.preventDefault();
    props = [event.id, currentUser.email]
    base.post(`events/${event.id}/${currentUser.email}`, props)
    console.log("You are going!!");
    history.push('/dashboard');
  }

  return (
    <div style={styles.main}>
      <HideAppBar title={event.title} />
      <div style={styles.secondary}>
        <img style={{ marginTop: "5%" }} src={event.image} alt="" srcset="" />
        <div style={styles.scheduleDiv}>
          <h3>Date: {event.date} </h3>
          <h3>Time: {event.time}</h3>
        </div>
        <div style={styles.textDiv}>
          <Typography variant="body1">
            <b>Description: </b>
            {event.description}
          </Typography>
          <br />
          <Typography variant="body1">
            <b>Details: </b>
            <br />
            {event.details}
          </Typography>
          <br />
          <hr />
          <Typography variant="body1">
            <b>Prior Knowledge: </b>
            {event.prereqs}
          </Typography>
          {/* <Button variant="outlined" onClick={joinEvent}>Attend Event</Button> */}
          {
              !event.people_going.includes(currentUser.email) && <Button variant="outlined" onClick={joinEvent}>Attend Event</Button>
          }
          {
              event.people_going.includes(currentUser.email) && <h5 style={{color: 'green'}}>You are Going for this Event!</h5>
          }
          <hr />
          <br />
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    width: "100%",
    backgroundColor: "aliceblue",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  secondary: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "spaceEvenly",
    backgroundColor: "white",
    marginTop: "5%",
    maxHeight: "300vh",
  },
  textDiv: {
    width: "100%",
    padding: "10%",
    borderTop: "1px solid lightgrey",
  },
  scheduleDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "spaceEvenly",
    // alignItems: "center",
  },
};

export default withRouter(EventDetails);
