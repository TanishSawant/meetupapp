import Home from './components/Pages/Home'
import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';

const useStyles = makeStyles((theme)=>{

})

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Home />
    </div>
  );
}

export default App;
