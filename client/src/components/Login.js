import React, {Component} from 'react';
import axios from 'axios';
import {Button, FormGroup, FormControl} from 'react-bootstrap';

class Login extends Component {

  state={
    username: '',
    password: '',
    message: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');
    this._login(this.state.username, this.state.password);
}

  _login = (username, password) => {
    axios.post('/auth/login', {
      username,
      password
    })
    .then(response => {
      console.log(response)
      if (response.status === 200) {
        localStorage.clear();
        localStorage.setItem("_id", response.data.user._id);
        localStorage.setItem("name", response.data.user.username);
        localStorage.setItem("account", response.data.user.accType);
      }
    }).then(() => {
      if(this.props.history.goBack() === "/createaccount") {
        console.log("it worked");
        //go to picks page
      } 
      this.props.history.goBack()
    })
    .catch(error => {
      console.log(error);
      console.log('incorrect username or password');
      this.setState({
        message: 'Incorrect username or password'
      });
    });
  }

  render() {
    return (
      <form>
        <FormGroup>
          <FormControl
            type="text"
            label="User Name"
            value={this.state.userName}
            placeholder="User Name"
            name="username"
            onChange={this.handleChange}
          />
          <FormControl
            type="password"
            label="Password"
            value={this.state.passWord}
            placeholder="password"
            name="password"
            onChange={this.handleChange}
            />
        </FormGroup>
        <Button 
          type="submit"
          onClick={this.handleSubmit}
        >
          Login
        </Button>
      </form>
    );
  }
}

export default Login;