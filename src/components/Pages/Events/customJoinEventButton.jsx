import React from 'react'
import { Button, Typography } from "@material-ui/core";


function CustomJoinEventButton({event, onPress, currentUser}) {
    console.log("------------------------------------")
    console.log(event);
    console.log(currentUser)
    return (
        <div>
          {
              !event.people_going.includes(currentUser.email) && <Button variant="outlined" onClick={onPress}>Attend Event</Button>
          }
          {
              event.people_going.includes(currentUser.email) && <h5 style={{color: 'green'}}>You are Going for this Event!</h5>
          }
        </div>
    )
}

export default CustomJoinEventButton
