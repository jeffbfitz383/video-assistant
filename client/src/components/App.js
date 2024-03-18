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

function App() {
  //return <h1>Highlight Video Assistant</h1>;
    return(
      
      <BrowserRouter>
        <NavBar/>

          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/signup">
              <Signup/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/addplay">
              <Addplay/>
            </Route>
            <Route exact path="/addproject">
              <Addproject/>
            </Route>
            <Route exact path="/userLoggedin">
              <UserLoggedin/>
            </Route>
            <Route exact path="/enterproject">
              <Enterproject/>
            </Route>
            <Route exact path="/useplay">
              <Useplay/>
            </Route>

          </Switch>
      
      
      </BrowserRouter>


    );
}

export default App;
