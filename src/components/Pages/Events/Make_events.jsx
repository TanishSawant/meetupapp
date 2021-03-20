import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../AuthContext";

const base = axios.create({
  baseURL: "http://localhost:8000/",
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function EventsForm() {
  const { currentUser } = useAuth();
  const history = useHistory();

  const routeChange = () => {
    let path = `dashboard`;
    history.push(path);
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('');
}

  const onSubmit = (e) => {
    console.log("object");
    e.preventDefault();
    const event = {
        host: currentUser.email,
        title: title,
        people_going: [currentUser.email],
        topic: topic,
        id: makeid(12),
        link: link,
        date: formatDate(date),
        time: time,
        online: true,
        description: desc
    };
    base
      .post("/events", event)
      .then((response) => {console.log(response.data);console.log("Successful!")})
      .catch((error) => {
        console.error("There was an error!", error);
      });
    routeChange();
  };

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState(Date('Sun May 11,2014'));
  const [time, setTime] = useState("");

//   const [_online, setOnline] = useState(true);

  const handleChangeTitle = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const handleChangeTopic = (e) => {
    console.log(e.target.value);
    setTopic(e.target.value);
  };

  const handleChangeDesc = (e) => {
    console.log(e.target.value);
    setDesc(e.target.value);
  };

  const handleChangeLink = (e) => {
    console.log(e.target.value);
    setLink(e.target.value);
  };

  return (
    <div>
      <div style={styles.main_container}>
        <div style={styles.secondaryContainer}>
          <h1>Create Group</h1>
          <h3>Host: {currentUser.email}</h3>
          <TextField
            label="Title"
            value={title}
            onChange={handleChangeTitle}
            type="text"
            style={styles.textFields}
          />

          <TextField
            label="Topic"
            value={topic}
            onChange={handleChangeTopic}
            type="text"
            style={styles.textFields}
          />

          <TextField
            label="Desc"
            value={desc}
            onChange={handleChangeDesc}
            type="text"
            style={styles.textFields}
          />
          <TextField
            label="Link To the Event Meet"
            value={link}
            onChange={handleChangeLink}
            type="text"
            style={styles.textFields}
          />
          <TextField
            id="Date"
            label="Next appointment"
            onChange={(value) => {
                const temp = value.target.value;
                formatDate(temp);
                console.log(temp);
                setDate(temp);
            }}
            type="date"
            defaultValue="2017-05-24T10:30"
            value={date}
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />

        <TextField
            id="time"
            label="Alarm clock"
            type="time"
            value={time}
            onChange={(value) => {setTime(value.target.value);console.log(value)}}
            defaultValue="07:30"
            // className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            inputProps={{
            step: 300, // 5 min
            }}
        />
          <Button
            variant="outlined"
            onClick={onSubmit}
            style={{ marginTop: "5%", marginBottom: "5%" }}
          >
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  main_container: {
    padding: "0%",
    backgroundColor: "aliceblue",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: "0%",
    width: "100%",
  },
  typography_heading: {
    paddingTop: "10%",
    marginLeft: "15%",
  },

  textFields: {
    marginTop: "10%",
    marginBottom: "25px",
    width: "50%",
  },

  secondaryContainer: {
    padding: "1%",
    backgroundColor: "white",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "50%",
    marginTop: "5%",
    marginBottom: "5%",
  },
};

export default EventsForm;
