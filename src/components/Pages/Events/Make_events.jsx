import React, { useState, useEffect } from "react";
import { TextField, Button, Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import emailjs from 'emailjs-com';

const sendEmail = (parameters) => {
  emailjs.send('service_4ak6lhq', 'template_4cromur', parameters, 'user_NXdsmzIIiTz4UvZSCC87Z')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}

const base = axios.create({
  baseURL: "http://localhost:8000/",
});


const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


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
  const [myGroups, setMyGroups] = React.useState([]);
  // const [group, setGroup] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [group, setGroup] = React.useState(null);


  useEffect(() => {
    const res = base
      .get(`/groups/groupbyhost/${currentUser.email}`)
      .then((response) => {
        setMyGroups(response.data);
        setGroup(response.data[0]);
      });
  }, []);

  useEffect(() => {
    console.log(myGroups);
    console.log(group)
  }, [myGroups, group]);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  //   console.log(event.currentTarget);
  // };
  const handleOpen = () => {
    setOpen(true);
  };


  const handleChange = async(event) => {
    await setGroup(event.target.value);
    // console.log(`${group} was selected`);
  };

  useEffect(() => {
    if(group === null || group === undefined) {
      console.log("No group selected")
    }else{
      console.log(`${group.title} was selected`);
    }
  }, [group]);
  

  const handleClose = () => {
    setOpen(false);
    console.log(topic);
  };

  const routeChange = () => {
    let path = `dashboard`;
    history.push(path);
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const classes = useStyles();

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
      description: desc,
      image: image,
      details: details,
      prereqs: prer,
      group: group.id
    };
    base
      .post("/events", event)
      .then((response) => {
        console.log(response.data);
        console.log("Successful!");
        group.members.forEach(member => {
          var params = {
            to_email: member,
            group_name: group.title
          };
          sendEmail(params);
          console.log("Ok")
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    routeChange();
  };

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState(Date("Sun May 11,2014"));
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [prer, setPrer] = useState("");
  // const [group, setGroup] = useState(null)

  //   const [_online, setOnline] = useState(true);

  const handleChangeTitle = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };
  const handleChangeDetails = (e) => {
    console.log(e.target.value);
    setDetails(e.target.value);
  };
  const handleChangePrer = (e) => {
    console.log(e.target.value);
    setPrer(e.target.value);
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

  const handleChangeImage = (e) => {
    console.log(e.target.value);
    setImage(e.target.value);
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
            multiline={true}
          />

          <TextField
            label="Link Of the Event Thumbnail image"
            value={image}
            onChange={handleChangeImage}
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
            label="Details"
            value={details}
            onChange={handleChangeDetails}
            type="text"
            style={styles.textFields}
            multiline={true}
          />

          <TextField
            label="Expected Prior Knowledge"
            value={prer}
            onChange={handleChangePrer}
            type="text"
            style={styles.textFields}
            multiline={true}
          />

          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Group
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={group? group.title: "Select Group"}
                onChange={handleChange}
              >
                {myGroups.map((grp) => {
                  return <MenuItem value={grp}>{grp.title}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
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
            style={styles.textFields}
          />

          <TextField
            id="time"
            label="Time"
            type="time"
            value={time}
            onChange={(value) => {
              setTime(value.target.value);
              console.log(value);
            }}
            defaultValue="07:30"
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            style={styles.textFields}
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
    maxheight: "500vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "50%",
    marginTop: "5%",
    marginBottom: "5%",
  },
};

export default EventsForm;
