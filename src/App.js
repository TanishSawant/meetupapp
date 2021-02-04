import Home from './components/Pages/Home'
import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import MenuAppBar from "./components/AppBarCustom";
import MiniDrawer from "./components/CustomDrawer";

const useStyles = makeStyles((theme)=>{

})

function App() {
  const classes = useStyles();
  return (
    <Router>
    <div className="App">
      <header className="App-header">
      </header>
      <MiniDrawer />
      <Switch>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/" component={Home} />
      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
