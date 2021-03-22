import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Listitem from "./Listitem";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


const base = axios.create({
  baseURL: "http://localhost:8000/",
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function List_events() {
  const [topic, setTopic] = useState("All");
  const [topics, setTopics] = useState([]);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);


  const classes = useStyles();
  useEffect(() => {
    async function getEvents() {
      const request = base.get("/events").then((request) => {
        // console.log(request.data);
        setEvents(request.data);
      });
      console.log("Hello");
      console.log(events);
      return request;
    }
    getEvents();
  }, []);

  useEffect(() => {
    const res = base.get("/events/gettopics/topics/512").then((resp) => {
      setTopics(resp.data);
    });
    console.log("TOpics:: ");
    console.log(topics);
  }, []);

  useEffect(() => {
    console.log(topics);
  }, [topics]);

  useEffect(() => {
    console.log(topics);
  }, [topics]);

  const handleChange = (event) => {
    setTopic(event.target.value);
    console.log(`${topic} was selected`);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(topic);
  };

  const handleOpen = () => {
    setOpen(true);
  };
//   const classes = useStyles();

  return (
    <div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Topic</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={topic}
            onChange={handleChange}
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            {topics.map((topic) => {
              return <MenuItem value={topic}>{topic}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <List className={classes.root}>
        {events.map((event) => {
            if (topic !== "All") {
                if (event.topic === topic) {
                    return <Listitem event={event} />;
                  }
            } else{
                return <Listitem event={event}/>;
            }      
    })}

      </List>
    </div>
  );
}

export default List_events;
