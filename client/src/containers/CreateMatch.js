import React, {Component} from "react";
import {connect} from 'react-redux';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {SplitButton, MenuItem, FormGroup, FormControl, ControlLabel, Form, Radio, Button} from "react-bootstrap";
import {fetchSchedule, updateSchedule, createSchedule} from '../actions';

class CreateMatch extends Component {
  state = {
    formInfo: {
      title: "New Match",
      homeTeam: "",
      awayTeam: "",
      league: "",
      _id: "ID",
      homeScore: 0,
      awayScore: 0,
      date: "",
      watch: [""],
      bestOf: 0
    },
    //newForm will remain the default blank form while formInfo changes.  newForm is called in a couple of methods
    newForm: {
      title: "New Match",
      homeTeam: "",
      awayTeam: "",
      league: "",
      _id: "ID",
      homeScore: 0,
      awayScore: 0,
      date: "",
      watch: [""],
      bestOf: 0
    },
    teams: []
  }

  //the following methods are all to let the user use the form and make changes to the formInfo
  handleChange = e => {
    let formInfo=this.state.formInfo;
    formInfo[e.target.name] = e.target.value;
    this.setState({formInfo});
  }

  handleDateChange = e => {
    let formInfo = this.state.formInfo;
    formInfo.date = e._d;
    this.setState({formInfo});
  }

  // changeTeam = e => {
  //   let formInfo = this.state.formInfo;

  // }
  changeLeague = e => {
    console.log('league changed');
    const twitch = {
      hgc:'https://www.twitch.tv/blizzheroes',
      hgg:'https://www.twitch.tv/playhearthstone',
      owc:'https://www.twitch.tv/playoverwatch',
      swc:'https://www.twitch.tv/starcraft',
      awc:'https://www.twitch.tv/warcraft',
      mdi:'https://www.twitch.tv/warcraft'
    };
    let formInfo = this.state.formInfo;
    formInfo.league = e.target.value;
    formInfo.watch[0] = twitch[e.target.value];
    this.changeTeams([e.target.value]);
    this.setState({formInfo});
  }

  changeTeams = source => {
    const allTeams = {
      hgc: ['TBD', 'Miracle', 'Team Liquid', 'Gen.G', 'Luna Meow', 'BTG', 'Tempo Storm', 'Team Dignitas', 'HeroesHearth Esports', 'Tempest', 'Mindfreak', 'Leftovers', 'TheOne'],
      hgg: ['TBD', 'Spain', 'Hong Kong', 'New Zealand', 'China', 'Bulgaria', 'Brazil', 'Norway', 'Singapore'],
      owc: ['TBD', 'South Korea', 'Finland', 'USA', 'Canada', 'China', 'Australia', 'France', 'United Kingdom'],
      swc: ['TBD', 'Maru', 'Lambo', 'TY', 'Neeb', 'Zest', 'HeroMarine', 'sOs', 'Serral', 'Stats', 'Has', 'Dark', 'ShoWTimE', 'Classic', 'Nerchio', 'Rogue', 'SpeCial'],
      awc: ['TBD', 'Super Frogs', 'Unitas', 'Pen and Paper', 'Reformed', 'Making a Movie', 'Cohesion Dream', 'ORDER', 'Tempo Storm', 'Method Black', 'The Gosu Crew', 'Method Orange', 'Skill Capped EU'],
      mdi: ['TBD', "exceL's Angels", 'Free Marsy', 'Method NA', 'Method PogChamp']
    };
    const teams = allTeams[source];
    this.setState({teams});
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
  //end methods to change formInfo state

  saveMatch = () => {
  console.log(this.state.formInfo);
  //save a new match
  const dataToSave = this.state.formInfo;
  if(dataToSave._id === "ID") {
    delete dataToSave._id;
    console.log('dataToSave: ', dataToSave)
    this.props.createSchedule(dataToSave, () => {this.reset()});
  } else {
    this.props.updateSchedule(dataToSave._id, dataToSave, () => {this.reset()});
  }
}

reset = () => {
  this.setState({formInfo: this.state.newForm});
}

  //form for creating events (called in this.form)
  render() {
    let formInfo = this.state.formInfo;
    return(
      <div>
        <SplitButton
          title={formInfo.title}
          key={0}
          id={`split-button-basic-0`}
        >
          <MenuItem
            key={1}
            eventKey='new'
            onClick={() => {
              this.setState({formInfo: this.state.newForm});
            }}
          >New Match</MenuItem>
          {this.props.events.map(match => (
            <MenuItem 
              key={match._id}
              eventKey={match.awayTeam}
              onClick={() => {
                this.changeTeams(match.league);
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
                placeholder={formInfo._id}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Match Title</ControlLabel>
              <FormControl
                type="text"
                name="title"
                value={formInfo.title}
                placeholder=""
                onChange={e => this.handleChange(e)}
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
                <option value='start'>Choose League</option>
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
              <FormControl componentClass='select'
                value={formInfo.awayTeam} 
                placeholder={formInfo.awayTeam} 
                name="awayTeam"
                onChange={e => this.handleChange(e)}
              >
                <option value={formInfo.awayTeam}>{formInfo.awayTeam}</option>
                {this.state.teams.map(team => (<option value={team} key={team}>{team}</option>))}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Home Team</ControlLabel>
              <FormControl componentClass='select' 
                value={formInfo.homeTeam} 
                placeholder={formInfo.homeTeam} 
                name="homeTeam"
                onChange={e => this.handleChange(e)}
              >
                <option value={formInfo.homeTeam}>{formInfo.homeTeam}</option>
                {this.state.teams.map(team => (<option value={team} key={team}>{team}</option>))}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Away Score</ControlLabel>
              <FormControl
                type="number"
                name="awayScore"
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
              <Button bsStyle="success" onClick={() => this.saveMatch()}>Save</Button>
              <Button bsStyle="warning" onClick={() => this.reset()}>Cancel</Button>
              <Button bsStyle="danger">Delete</Button>
            </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

export default connect(mapStateToProps, {fetchSchedule, createSchedule, updateSchedule})(CreateMatch);