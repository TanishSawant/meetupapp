import React, {useState, useEffect} from 'react'
import {useAuth} from '../../../AuthContext'
import {useHistory, Link} from 'react-router-dom'
import axios from 'axios';
import {Typography} from '@material-ui/core'

const base = axios.create({
    baseURL: 'http://localhost:8000/'
});


function MyEvents() {

    const {currentUser} = useAuth();
    const {history} = useHistory();
    const [events, setEvents] = useState([]);

    
    useEffect(() => {
        async function getEvents() {
            const result = await base.get('/events').then((response) => {
                setEvents(response.data);
            });
            return events;
        };
        getEvents();
    }, []);

    useEffect(() => {
        console.log("Happy")
        console.log(events);
    }, [events]);

    return (
        <div>
            <div>
                <Typography variant="h2">Your Events</Typography>
                <p>Logged in As {currentUser.email}</p>
                <div style={styles.flexContainer}>
                    <ul>

                {
                    events.map((grp) => {
                        if(grp.people_going.includes(currentUser.email)){
                            {console.log(grp)}
                            return (
                                <li>
                                    {grp.title}
                                    <Link to={`/events/${grp.id}`}>See details</Link>
                                </li>
                            );
                        }
                    })
                }
                    </ul>
                    
            </div>
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

export default MyEvents
