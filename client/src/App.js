import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Navibar from "./components/Navibar";
import Login from "./containers/Login";
import CreateAccount from "./containers/CreateAccount";
import Calendar from "./containers/Calendar";
import Picks from "./containers/Picks";


export default class App extends Component {
  render() {
    return (
      <div className="App">
       <Router>
         <div>
          <Header />
          <Navibar />
          <Route exact path="/login" component={Login} />
          <Route exact path="/createaccount" component={CreateAccount} />
          <Route exact path="/picks" component={Picks} />
          <Route exact path="/calendar" component={Calendar} />
         </div>
        </Router>
       <footer />
      </div>
    );
  }
}