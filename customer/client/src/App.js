import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navibar from "./components/Navibar";
import Calendar from "./containers/Calendar";
import Picks from "./containers/Picks";


export default class App extends Component {
  render() {
    return (
      <div className="App">
      <header />
       <Navibar />
       <Router>
         <div>
          <Route exact path="/picks" component={Picks} />
          <Route exact path="/calendar" component={Calendar} />
         </div>
        </Router>
       <footer />
      </div>
    );
  }
}