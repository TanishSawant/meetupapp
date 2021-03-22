import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import axios from "axios";
import HideAppBar from "../../../CustomAppBar";
import { Button, Typography } from "@material-ui/core";
import {useAuth} from '../../../AuthContext'
import CustomJoinEventButton from "./customJoinEventButton";
import emailjs from 'emailjs-com';

const base = axios.create({
  baseURL: "http://localhost:8000/",
});

function EventDetails(props) {
  console.warn(props);
  const [event, setEvent] = useState({});
  const {currentUser} = useAuth();
  const history = useHistory();
  const [alreadyIn, setIn] = useState(false);

  // async function getEvents() {
  //     const res = base.get(`/events/${props.match.params.id}`).then((res) => {
  //         // console.log(res.data);
  //         setEvent(res.data);
  //         console.log(event);
  //     });
  //     return event;
  // }

  const sendEmail = (parameters) => {
    emailjs.send('service_4ak6lhq', 'template_2utmm0b', parameters, 'user_NXdsmzIIiTz4UvZSCC87Z')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  useEffect(() => {
    async function getEvents() {
      const res = base.get(`events/${props.match.params.id}`).then((res) => {
        // console.log(res.data);
        setEvent(res.data);
      });
      return res;
    }
    getEvents();
  }, []);

  useEffect(() => {
    console.log(event);
  }, [event]);


  // useEffect(() => {
  //   setPeople(event.people_going);
  // }, [event]);

  // useEffect(() => {
  //   console.log(people_going);
  // }, [people_going]);


  const joinEvent = (e) => {
    e.preventDefault();
    props = [event.id, currentUser.email]
    if(event.people_going.includes(currentUser.email)){
      console.log("Already in!!")
      setIn(true);
      return <h1>Already in!!</h1>
    }
    base.post(`events/${event.id}/${currentUser.email}`, props)
    console.log("You are going!!");
    const params = {
      message: `The link to the event is: ${event.link}
        Please do not share this link with others.
      `,
      to_email: currentUser.email,
      title: event.title,
    }
    sendEmail(params);
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
          {
            !alreadyIn && <Button variant="outlined" onClick={joinEvent}>Attend Event</Button>
          }
          {
            alreadyIn && <h5 style={{color: 'green'}}>You are Going for this Event!</h5>
          }

          {/* <CustomJoinEventButton event={event} onPress={joinEvent} currentUser={currentUser} /> */}
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
