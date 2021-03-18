import React, {useState} from 'react'
import {TextField, Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {useAuth} from '../../../AuthContext'

const base = axios.create({
    baseURL: 'http://localhost:8000/'
})

const styles = {
    main_container: {
      padding: "0%",
      backgroundColor: "aliceblue",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: "0%",
      height: "100vh",
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
  };

function Make_group() {
    const {currentUser} = useAuth();
    const history = useHistory();

    const routeChange = () => {
      let path = `dashboard`;
      history.push(path);
    };

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }    

    const onSubmit = (e) => {
        console.log("object")
        e.preventDefault();
        const grp = {
            title: title,
            topic: topic,
            Creator: currentUser.email,
            id: makeid(8),
            members: [currentUser.email]
        };
        const res = base.post("/groups", {grp})
        .then(res => {
            console.log("group created!!")
            console.log(res.data);
        });
      };

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");

    const handleChangeTitle = (e) => {
        console.log(e.target.value);
        setTitle(e.target.value);
    };
    
    const handleChangeTopic = (e) => {
        console.log(e.target.value);
        setTopic(e.target.value);
    };

    return (
        <div style={styles.main_container}>
            <h1>Create Group</h1>
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
            
            <Button variant="outlined" onClick={onSubmit}>Create Group</Button>
        </div>
    )
}

export default Make_group
