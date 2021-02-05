import Home from './components/Pages/Home'
import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/footer"
import AuthProvider from "./AuthContext"
import Landing from "./components/Pages/landing";
import Profile from "./components/Pages/Profile"

const useStyles = makeStyles((theme)=>{
  
})

function App() {
  const classes = useStyles();
  return (
    <AuthProvider>
    <Router>
    <div className="App">
      <header className="App-header">
      </header>
      <Switch>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/dashboard" component={Landing}/>
        <Route path="/userprofile" component={Profile}/>
        <Route path="/" component={Home} />
      </Switch>
    </div>
    <Footer/>
    </Router>
    </AuthProvider>
  );
}

export default App;
