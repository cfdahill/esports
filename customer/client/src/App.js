import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Navibar from "./components/Navibar";
import Calendar from "./containers/Calendar";


export default class App extends Component {
  render() {
    return (
      <div className="App">
      <header />
       <Navibar />
       <Router>
         <Route exact path="/calendar" component={Calendar} />
        </Router>
       <footer />
      </div>
    );
  }
}