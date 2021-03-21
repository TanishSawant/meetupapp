import React from 'react'
import { withRouter } from 'react-router-dom';

function GroupsWithTopic(props) {
    console.warn(props);
    return (
        <div>
            <h1>{props.match.params.topic}</h1>
        </div>
    )
}

export default withRouter(GroupsWithTopic);
