import React, {Component} from 'react';

export default class Header extends Component {
//once logging in works, header will detect if logged in.  If logged in, show name, points and logout button; else show Guest, login button
  render() {
    return(
      <header>
        Name, points
        <button>Login</button>
      </header>
    )
  }
}