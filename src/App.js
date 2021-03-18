import Home from './components/Pages/Home';
import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/footer";
import AuthProvider from "./AuthContext";
import Landing from "./components/Pages/landing";
import Profile from "./components/Pages/Profile";
import PrivateRoutes from './components/Pages/PrivateRoutes';
import Make_groups from "./components/Pages/Groups/make_group";
import GroupList from "./components/Pages/Groups/group_list"

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
        <PrivateRoutes path="/dashboard" component={Landing}/>
        <Route path="/userprofile" component={Profile}/>
        <Route path="/create_groups" component={Make_groups}/>
        <Route path="/groups" component={GroupList}/>
        <Route path="/" component={Home} />
      </Switch>
    </div>
    <Footer/>
    </Router>
    </AuthProvider>
  );
}

export default App;
