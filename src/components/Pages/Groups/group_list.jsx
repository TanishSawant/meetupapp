import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GroupCard from '../../groups_card'
import Typography from '@material-ui/core/Typography';

const base = axios.create({
    baseURL: 'http://localhost:8000/'
})

function GroupList() {
    const [groups, setGroups] = useState([]);
    
    useEffect(() => {
        async function getGroups() {
            const request = base.get('/groups')
            .then((request) =>{
                setGroups(request.data);
            });
            console.log("Hello groups");
            console.log(groups);
            return request;
        };
        getGroups();
    }, [])

    return (
        <div style={{backgroundColor: '#FFFFFF'}}>
            <Typography variant="h2" color="textSecondary" component="p" style={{marginLeft:'20%', marginTop:'5%'}}>Find The Group With Like-minded people</Typography>
            <div style={styles.group_div}>
                {groups.map(group =>
                        <GroupCard group={group}/>
                    )}
                
            </div>
            
        </div>
    )
}

const styles = {
    group_div: {
        padding: "10%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        backgroundColor: "white"
    }

}

export default GroupList
