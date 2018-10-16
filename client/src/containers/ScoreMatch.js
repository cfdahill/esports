import React, {Component} from "react";
import {connect} from 'react-redux';
import moment from 'moment-timezone';
import {SplitButton, MenuItem, FormGroup, FormControl, ControlLabel, Form, Button} from "react-bootstrap";
import {fetchSchedule, updateSchedule} from '../actions';

class ScoreMatch extends Component {
  state = {
    formInfo: {
      title: "",
      homeTeam: "",
      awayTeam: "",
      league: "Choose a Match",
      _id: "ID",
      homeScore: 0,
      awayScore: 0,
      date: moment(),
      watch: [""],
      bestOf: 0
    },
    newForm: {
      title: "",
      homeTeam: "",
      awayTeam: "",
      league: "Choose a Match",
      _id: "ID",
      homeScore: 0,
      awayScore: 0,
      date: moment(),
      watch: [""],
      bestOf: 0
    }
  }

  handleChange = e => {
    let formInfo=this.state.formInfo;
    formInfo[e.target.name] = e.target.value;
    this.setState({formInfo});
  }

  saveMatch = () => {
    console.log(this.state.formInfo);
    //save a new match
    const dataToSave = this.state.formInfo;
    this.props.updateSchedule(dataToSave._id, dataToSave, () => {console.log("Augmentation Complete!")});
  }

  reset = () => {
    this.setState({formInfo: this.state.newForm});
  }

  render() {
    let formInfo = this.state.formInfo;
    return(
      <div>
        <SplitButton
          title={`${formInfo.date}: ${formInfo.league}`}
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
          {this.props.events.filter(match => (moment(match.date).isBefore(moment().add(3, 'hours')) 
              && moment(match.date).isAfter(moment().subtract(1, 'day')))).map(match => (
            <MenuItem 
              key={match._id}
              eventKey={match.awayTeam}
              onClick={() => {
                this.setState({formInfo: match}, console.log(formInfo));
              }}
              >
              {match.date}: {match.league}
            </MenuItem>
          ))}
        </SplitButton>
        <div>Best Of: {formInfo.bestOf}</div>
        <div>
          Away Team: {formInfo.awayTeam}        Home Team: {formInfo.homeTeam}
        </div>
        <Form inline>
            <FormGroup>
              <ControlLabel>Away Score</ControlLabel>
              <FormControl
                type="number"
                name="awayScore"
                value={formInfo.awayScore}
                placeholder={0}
                min={0}
                max={Math.ceil(formInfo.bestOf/2)}
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
                min={0}
                max={Math.ceil(formInfo.bestOf/2)}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
          </Form>
          <Button bsStyle="success" onClick={() => this.saveMatch()}>Save</Button>
          <Button bsStyle="warning" onClick={() => this.reset()}>Cancel</Button>

        </div>
    )}
}
function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

export default connect(mapStateToProps, {fetchSchedule, updateSchedule})(ScoreMatch);