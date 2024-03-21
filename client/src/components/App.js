import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import Addplay from './Addplay'
import Addproject from "./Addproject";
import UserLoggedin from "./UserLoggedin";
import Enterproject from "./Enterproject"
import Useplay from "./Useplay"
import { useHistory } from "react-router-dom";
import DeletePlay from "./Deleteplay";
import UpdatePlay from "./UpdatePlay"

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [showSignup, setShowSignup] = useState(false)
  

  useEffect(() => {

    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return (
  <>
  {
    showSignup ? <Signup /> : <Login onLogin={setUser}/>

  }
  <button onClick={()=> setShowSignup(!showSignup)}>{showSignup ? "Login" : "Signup"}</button>
  </>
  )

    return(
      
      <BrowserRouter>
        <NavBar/>

          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/Signup">
              {
                showSignup ?
              <Signup/> : <Login/>
              }
            </Route>
            <Route exact path="/login">
              <Login onLogin={setUser}/>
            </Route>
            <Route exact path="/addplay">
              <Addplay/>
            </Route>
            <Route exact path="/addproject">
              <Addproject/>
            </Route>
            <Route exact path="/userLoggedin">
              <UserLoggedin setUser={setUser}/>
            </Route>
            <Route exact path="/enterproject">
              <Enterproject/>
            </Route>
            <Route exact path="/useplay">
              <Useplay/>
            </Route>
            <Route exact path="/deleteplay">
              <DeletePlay/>
            </Route>
            <Route exact path="/updateplay">
              <UpdatePlay/>
            </Route>

          </Switch>
      
      
      </BrowserRouter>


    );
}

export default App;
