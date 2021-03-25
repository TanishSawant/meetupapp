import React, { useState, useEffect } from "react";
import axios from "axios";
import GroupCard from "../../groups_card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";
// import Button from '@material-ui/core/Button';

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

function GroupList() {
  const [groups, setGroups] = useState([]);
  const history = useHistory();
  const [topic, setTopic] = useState("");
  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function getGroups() {
      const request = base.get("/groups").then((request) => {
        setGroups(request.data);
      });
      console.log("Hello groups");
      console.log(groups);
      return request;
    }
    getGroups();
  }, []);

  useEffect(() => {
    const res = base.get("/groups/gettopics/topics/512").then((resp) => {
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

  const classes = useStyles();

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

  return (
    <div style={{ backgroundColor: "orange" }}>
      <Typography
        variant="h2"
        color="textSecondary"
        component="p"
        style={{ marginLeft: "20%", marginTop: "5%", color:"white" }}
      >
        Find The Group With Like-minded people
      </Typography>
      <div style={styles.topics_div}>
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
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {topics.map((topic) => {
              return <MenuItem value={topic}>{topic}</MenuItem>;
            })}
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      <div style={styles.group_div}>
        {/* {groups.map((group) => {
          <GroupCard group={group} />
      })} */}
        {groups.map((group) => {
          if (topic !== "") {
            if (group.topic === topic) {
              return <GroupCard group={group} />;
            }
          } else {
            return <GroupCard group={group} />;
          }
        })}
      </div>
    </div>
  );
}

const styles = {
  group_div: {
    padding: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "orange",
  },
  topics_div: {
    marginLeft: "40%",
    marginTop: "5%",
  },
};

export default GroupList;
