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
      padding:'1%',
      backgroundColor: 'white',
      height:'100vh',
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "50%",
      marginTop: "5%",
      marginBottom: "5%"
    }
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
            members: [currentUser.email],
            description: desc
        };
        base.post('/groups', grp)
        .then(response => console.log(response.data))
        .catch(error => {
            console.error('There was an error!', error);
        });
        routeChange();
      };

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [desc , setDesc] = useState("");

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

    return (
        <div style={styles.main_container}>
          <div style={styles.secondaryContainer}>
            <h1>Create Group</h1>
            <h3>Creator: {currentUser.email}</h3>
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

            <Button variant="outlined" onClick={onSubmit} style={{marginTop:'5%', marginBottom:'5%'}}>Create Group</Button>
            
            </div>
        </div>
    )
}

export default Make_group
