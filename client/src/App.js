import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./containers/Header";
import Navibar from "./components/Navibar";
import Login from "./components/Login";
import CreateAccount from "./containers/CreateAccount";
import Calendar from "./containers/Calendar";
import Picks from "./containers/Picks";
import Admin from "./components/Admin";
import Shop from "./containers/Shop";
import Footer from "./components/Footer";
import Home from "./components/Home";


export default class App extends Component {
  render() {
    return (
      <div className="App">
       <Router>
         <div>
          <Header />
          <Navibar />
          <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/createaccount" component={CreateAccount} />
          <Route exact path="/picks" component={Picks} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/calendar" component={Calendar} />
          <Route component={Home} />
          </Switch>
         </div>
        </Router>
       <Footer />
      </div>
    );
  }
}