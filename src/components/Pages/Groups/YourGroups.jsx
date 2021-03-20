import React, {useState, useEffect} from 'react'
import {useAuth} from '../../../AuthContext'
import {useHistory} from 'react-router-dom'
import GroupCard from '../../../components/groups_card'
import axios from 'axios';
import {Typography} from '@material-ui/core'

const base = axios.create({
    baseURL: 'http://localhost:8000/'
});


function YourGroups() {

    const {currentUser} = useAuth();
    const {history} = useHistory();
    const [groups, setGroups] = useState([]);

    
    useEffect(() => {
        async function getGroups() {
            const result = await base.get('/groups').then((response) => {
                setGroups(response.data);
                // console.log(response.data);
                // console.log(groups);
            });
            return groups;
        };
        getGroups();
    }, []);

    useEffect(() => {
        console.log("Happy")
        console.log(groups);
    }, [groups]);
    
    return (
        <div>
            <Typography variant="h2">Your Groups</Typography>
            <p>As {currentUser.email}</p>
            <div style={styles.flexContainer}>
            {
                groups.map((grp) => {
                    if(grp.members.includes(currentUser.email)){
                        {console.log(grp)}
                        return (<GroupCard group={grp}/>);
                    }
                })
            }
                    
            </div>
        </div>
    )
}

const styles = {
    flexContainer: {
        padding: "10%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        backgroundColor: "white"
    }
}

export default YourGroups
