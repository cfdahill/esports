import React, { Component } from 'react';
import Navibar from "./components/Navibar";
import Calendar from "./containers/Calendar";

export default class App extends Component {
  render() {
    return (
      <div className="App">
      <header />
       <Navibar />
       <Calendar />
       <footer />
      </div>
    );
  }
}