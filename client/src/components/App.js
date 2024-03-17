import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import Addplay from './Addplay'
import Addproject from "./Addproject";

function App() {
  //return <h1>Highlight Video Assistant</h1>;
    return(
      
      <BrowserRouter>
        <NavBar/>

          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/Signup">
              <Signup/>
            </Route>
            <Route exact path="/Login">
              <Login/>
            </Route>
            <Route exact path="/Addplay">
              <Addplay/>
            </Route>
            <Route exact path="/Addproject">
              <Addproject/>
            </Route>

          </Switch>
      
      
      </BrowserRouter>


    );
}

export default App;
