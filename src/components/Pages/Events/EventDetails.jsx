import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios'


const base = axios.create({
    baseURL: 'http://localhost:8000/'
});

function EventDetails(props) {
    console.warn(props);
    const [event, setEvent] = useState({});
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
            const res = base.get(`events/${props.match.params.id}`)
            .then((res) =>{
                // console.log(request.data);
                setEvent(res.data);
            });
            return res;
        };
        getEvents();
    }, []);

    useEffect(() => {
        console.log(event);
    }, [event]);

    return (
        <div>
            <h1>Hello Events: {props.match.params.id}</h1>
            <ul>
                <li>
                    {event.id}
                </li>
                <li>
                    {event.title}
                </li>
                <li>
                    {event.topic}
                </li>
                <li>
                    {event.links}
                </li>
                <li>
                    {event.host}
                </li>
                
            </ul>
        </div>
    )
}

export default withRouter(EventDetails);
