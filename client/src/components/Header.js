import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Header extends Component {
//once logging in works, header will detect if logged in.  If logged in, show name, points and logout button; else show Guest, login button
state = {
  name: 'Visitor',
  totalPoints: 0,
  currentPoints: 0
}


componentDidMount = () => {
  if(localStorage.getItem("name")) {
  const name = localStorage.getItem("name");
  const points = JSON.parse(localStorage.getItem("points"));
  const totalPoints = points.lifetime;
  const currentPoints = points.spent;
  this.setState({name, totalPoints, currentPoints});
  }
}

_logout = () => {
  // event.preventDefault()
  console.log('handleClick')
  console.log('logging out')
  axios.post('/auth/logout').then(response => {
    console.log(response.data)
    localStorage.clear();
    if (response.status === 200) {
      console.log(this.state);
      this.setState({
        name: '',
        totalPoints: 0,
        currentPoints: 0
      })
    }

  })
}


  render() {
   
    return(
      <header>
        <ul>
          <li>{this.state.name}</li>
          <li>Total points: {this.state.totalPoints}</li>
          <li>Current points: {this.state.currentPoints}</li>
          <li> {this.state.name ==="Visitor" ? 
            <Link to="/login"><button>Login</button></Link> :
            <button onClick={this._logout}>Logout</button>
            }
          </li>
        </ul>
      </header>
    )
  }
}