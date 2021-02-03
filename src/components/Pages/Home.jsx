import React, {useEffect} from 'react'
import app from '../../../src/firebase'

export default function Home() {

    useEffect(() => {
        console.log(app);
      }, []);
    
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}
