import React, {Component} from "react";
import {Grid, Row, Col, Button} from "react-bootstrap";

import CreateMatch from '../containers/CreateMatch';
import ScoreMatch from '../containers/ScoreMatch';

export default class Admin extends Component {
  state = {
    showEvents: false,
    showUsers: false,
    showShop: false,
  }

//sets all forms to false and the picked form to true so user can toggle between forms
  formPicked = e => {
    let show = {
      showEvents: false,
      showUsers: false,
      showShop: false,
      showScore: false
    };
    show[e.target.value] = true
    this.setState(show);
  }


  //forms to edit user info (will make this a container)
  usersForm = () => {
    return(
      <div>
        This will let admin adjust users' points, store purchases, view archive points, and view/write logs of users' issue and solution
      </div>
    )
  }

  //forms to edit store info (will make this a container)
  shopForm = () => {
    return(
      <div>
        This will let admin add/remove products, update descriptions and images, and adjust costs
      </div>
    )
  }

  //once the user picks the form they want this will render it (called in render)
  form =() => {
    return(
      <div>
        {this.state.showScore ? <ScoreMatch /> :
          this.state.showEvents ? <CreateMatch /> :
          this.state.showUsers ? this.usersForm() :
          this.state.showShop ? this.shopForm() :
          <p>Choose an action.</p>}
      </div>
    )
  }

  render() {
    return(
      <div>
        <h1>
          Administration Page
        </h1>
        <Grid>
          <Row className="show-grid">
          <Col xs={4} md={4}>
              <Button onClick={this.formPicked} value="showScore">{'Score Matches'}</Button>
            </Col>
            <Col xs={4} md={3}>
              <Button onClick={this.formPicked} value="showEvents">{'Edit/Add Matches'}</Button>
            </Col>
            <Col xs={4} md={3}>
              <Button onClick={this.formPicked} value="showUsers">{'Edit Users'}</Button>
            </Col>
            <Col xs={4} md={3}>
              <Button onClick={this.formPicked} value="showShop">{'Edit Shop'}</Button>
            </Col>
          </Row>
        </Grid>
        {this.form()}
      </div>
    )
  }
}