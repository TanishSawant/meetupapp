import React, {useState, useEffect} from 'react'
import {useAuth} from '../../../AuthContext'
import {useHistory} from 'react-router-dom'
import GroupCard from '../../groups_card';
import axios from 'axios';

const base = axios.create({
    baseURL: 'http://localhost:8000/'
});


function YourGroups() {
    const {currentUser} = useAuth();
    const {history} = useHistory();
    const [grps, setGrps] = useState([]);
    
    useEffect(() => {
        async function getGroups() {
            base.get('/groups')
            .then((res) =>{
                setGrps(res.data);
            });
            console.log("Hello groups*********************");
            console.log(grps);
            return "Done!";
        };
        getGroups();
    }, [])
    return (
        <div>
            {/* {
                grps.map((grp) => {
                    if (grp.members.includes(currentUser.email)) {
                        <GroupCard group={grp}/>
                    }
                })
            } */}
        </div>
    )
}

export default YourGroups
