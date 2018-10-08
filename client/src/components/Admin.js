import React, {Component} from "react";
import {connect} from 'react-redux';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {Grid, Row, Col, SplitButton, MenuItem, FormGroup, FormControl, ControlLabel, Form, Radio, Button} from "react-bootstrap";
import {fetchSchedule, fetchPicks, fetchPoints, createPick} from '../actions';

//need createSchedule, fetchUser to replace fetchPicks, fetchPoints

class Admin extends Component {
  state = {
    showEvents: false,
    showUsers: false,
    showStore: false,
    formInfo: {
      homeTeam: "",
      awayTeam: "",
      league: "New Match",
      _id: "",
      homeScore: 0,
      awayScore: 0,
      date: "",
      watch: ["placeholder"],
      bestOf: 0
    }
  }

  formPicked = e => {
    let show = {
      showEvents: false,
      showUsers: false,
      showStore: false,
    };
    show[e.target.value] = true
    this.setState(show);
  }

  handleChange = e => {
    let formInfo = this.state.formInfo;
    formInfo[e.target.name] = e.target.value;
    this.setState({formInfo});
  }

  handleDateChange = e => {
    let formInfo = this.state.formInfo;
    formInfo.date = e._d;
    this.setState({formInfo});
  }

  changeLeague = e => {
    const twitch = {
      hgc:'https://www.twitch.tv/blizzheroes',
      hgg:'https://www.twitch.tv/playhearthstone',
      owc:'https://www.twitch.tv/playoverwatch',
      swc:'https://www.twitch.tv/starcraft',
      awc:'https://www.twitch.tv/warcraft',
      mdi:'https://www.twitch.tv/warcraft'
    }
    let formInfo = this.state.formInfo;
    formInfo.league = e.target.value;
    formInfo.watch[0] = twitch[e.target.value];
    this.setState({formInfo});
  }

  changeBestOf = e => {
    let formInfo = this.state.formInfo;
    formInfo.bestOf = e.target.value;
    this.setState({formInfo});
  }

  //will need to modify this once setting up for multiple viewing locations
  changeView = e => {
    let formInfo = this.state.formInfo;
    formInfo.watch[0] = e.target.value;
    this.setState({formInfo});
  }

  eventsForm = () => {
    const newForm = {
      homeTeam: "",
      awayTeam: "",
      league: "New Match",
      _id: "",
      homeScore: 0,
      awayScore: 0,
      date: "",
      watch: ["placeholder"]
    };
    let formInfo = this.state.formInfo;
    return(
      <div>
        <SplitButton
          // bsStyle={title.toLowerCase()}
          title={`${formInfo.league}: ${formInfo.awayTeam} vs. ${formInfo.homeTeam}`}
          key={0}
          id={`split-button-basic-0`}
        >
          <MenuItem
            key={1}
            eventKey='new'
            onClick={() => {
              this.setState({formInfo: newForm});
            }}
          >New Match</MenuItem>
          {this.props.events.map(match => (
            <MenuItem 
              key={match._id}
              eventKey={match.awayTeam}
              onClick={() => {
                this.setState({formInfo: match}, console.log(formInfo));
              }}
              >
              {match.league}: {match.awayTeam} vs. {match.homeTeam}
            </MenuItem>
          ))}
        </SplitButton>
        {/* ----------------FORM-------------------------- */}
        <Form >
            <FormGroup>
              <ControlLabel>Match ID</ControlLabel>
              <FormControl
                type="text"
                value={formInfo._id}
                placeholder="ID"
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Date & Time</ControlLabel>
              <Datetime 
                name="date" 
                label="Testing this"
                value={formInfo.date}
                onChange={(e) => this.handleDateChange(e)}
              />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>League</ControlLabel>
              <FormControl componentClass="select" value={formInfo.league} placeholder={formInfo.league} onChange={(e) => this.changeLeague(e)}>
                <option value="hgc">Heroes Global Championship</option>
                <option value="hgg">Hearthstone Global Games</option>
                <option value='owc'>Overwatch World Cup</option>
                <option value='swc'>Starcraft World Championship</option>
                <option value = 'awc'>WoW - Arena World Championship</option>
                <option value = 'mdi'>WoW - Mythic Dungeon Invitational</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Best of:</ControlLabel>
              <Radio name="bestOf" value={3} inline onChange={(e) => this.changeBestOf(e)}>3</Radio>
              <Radio name="bestOf" value={5} inline onChange={(e) => this.changeBestOf(e)}>5</Radio>
              <Radio name="bestOf" value={7} inline onChange={(e) => this.changeBestOf(e)}>7</Radio>
            </FormGroup>
          </Form>
          <Form inline>
            <FormGroup>
              <ControlLabel>Away Team</ControlLabel>
              <FormControl
                type="text"
                name="awayTeam"
                value={formInfo.awayTeam}
                placeholder="away team"
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Home Team</ControlLabel>
              <FormControl
                type="text"
                name="homeTeam"
                value={formInfo.homeTeam}
                placeholder="home team"
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Away Score</ControlLabel>
              <FormControl
                type="number"
                name="awayTeam"
                value={formInfo.awayScore}
                placeholder={0}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Home Score</ControlLabel>
              <FormControl
                type="number"
                name="homeScore"
                value={formInfo.homeScore}
                placeholder={0}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
          </Form>
          <Form>
            <FormGroup>
              <ControlLabel>View:</ControlLabel>
              <FormControl
                type="text"
                name="watch[0]"
                value={formInfo.watch[0]}
                // placeholder={formInfo.watch[0]}
                onChange={e => this.changeView(e)}
              />
            </FormGroup>
              <Button bsStyle="success" onClick={() => {console.log(this.state.formInfo)}}>Save</Button>
              <Button bsStyle="warning" onClick={() => {this.setState({formInfo: newForm})}}>Cancel</Button>
              <Button bsStyle="danger">Delete</Button>
            </Form>
      </div>
    )
  }

  onSubmit(values) {
    console.log(values);
  }

  usersForm = () => {
    return(
      <div>
        This will let admin adjust users' points, store purchases, view archive points, and view/write logs of users' issue and solution
      </div>
    )
  }

  storeForm = () => {
    return(
      <div>
        This will let admin add/remove products, update descriptions and images, and adjust costs
      </div>
    )
  }

  form =() => {
    return(
      <div>
        {this.state.showEvents ? this.eventsForm() :
          this.state.showUsers ? this.usersForm() :
          this.state.showStore ? this.storeForm() :
          <p>Choose an action.</p>}
      </div>
    )
  }

  render() {
    console.log(this.state.formInfo);
    return(
      <div>
        <h1>
          Administration Page
        </h1>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <button onClick={this.formPicked} value="showEvents">{'Edit/Add Events'}</button>
            </Col>
            <Col xs={6} md={4}>
              <button onClick={this.formPicked} value="showUsers">{'Edit Users'}</button>
            </Col>
            <Col xs={6} md={4}>
              <button onClick={this.formPicked} value="showStore">{'Edit Store'}</button>
            </Col>
          </Row>
        </Grid>
        {this.form()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    picks: state.picks,
    points: state.points
  };
}

export default connect(mapStateToProps, {fetchPicks, fetchPoints, fetchSchedule, createPick})(Admin);


