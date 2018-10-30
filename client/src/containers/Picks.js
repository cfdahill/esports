import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchSchedule, fetchPicks, createPick} from '../actions';
import _ from 'lodash';
import moment from 'moment-timezone';
import {Well, Grid, Row, Col, Button} from "react-bootstrap";
// import '../tempCSS.css';
import '../css/picks.css';


class Picks extends Component {

  state = {
    id: localStorage.getItem("_id"),
  }
 
  componentDidMount = () => {
    if(localStorage.getItem("_id")) {
      this.props.fetchPicks(this.state.id);
    }
    this.props.fetchSchedule();
  }

  //saves user's picks to database and rerenders appropriate component
  savePick = (team, game) => {
    const propPicks = this.props.picks;
    const picked = {
      date: game.date,
      game: game._id,
      pick: team,
      correct: -1
    };
    let picks = [];
    (picks = propPicks.filter(pick => pick.game !== game._id)).push(picked);
    const dataToPush = {dataToPush: {
      picks: picks
    }};
    console.log(dataToPush);
    this.props.createPick(this.state.id, dataToPush, () => {
      this.props.fetchPicks(this.state.id)
    });
  }

  //renders each individual event information with buttons for picks
  match = () => {
    let events = this.props.events;
    if(events.length > 1) {
      //The following line will remove any events from rendering if the event was more than 1 day ago.  Will uncomment once I am ready to implement this.
      // events = this.props.events.filter(event => (moment(event.date).isAfter(moment().add(1, 'days'))));
      events = _.sortBy(events,['date']);
    }
    return _.map(events, event => {
      const userPick = this.props.picks.find(pick => (pick.game === event._id));
      let pick = '';
      if(userPick) {pick = userPick.pick};
      const date = moment(event.date).format('MMMM D, YYYY');
      const time = moment(event.date).format('h:mm a');
      return(
        <Well key={event._id} className={`picksWell picks${event.league}`}>
            <h1 className='picksTitle'>{event.title}</h1>
            <Grid>
            <Row>
              <Col xs={3}>
                <img className="picksPic" src={`/images/${event.league}.png`} alt={`${event.league} logo`}></img>
                <p className='twitch'>Watch: <a href={event.watch[0]} target="blank">Twitch</a></p>
              </Col>
              <Col xs={9}>
                <Row>
                  <h2 className='picksMatch'>{`${event.awayTeam} vs ${event.homeTeam}`}</h2>
                </Row>
                <Row>
                        <p className='picksScore'>{event.awayScore} - {event.homeScore}</p>
                </Row>
                    {moment().isAfter(event.date) ?
                      <Row>
                      <Col className={pick === event.awayTeam ? `pickedDiv picksLeftButton tooLate` : `tooLate notPickedDiv picksLeftButton`} xs={2}>
                        <Button className={pick === event.awayTeam ? `picked pickButton` : `pickButton notPicked`}>
                          {event.awayTeam}
                        </Button>
                      </Col>
                      <Col xs={2} className={pick === event.homeTeam ? `pickedDiv tooLate` : `tooLate notPickedDiv`}>
                        <Button className={pick === event.homeTeam ? `picked pickButton` : `pickButton notPicked`}>
                          {event.homeTeam}
                        </Button>
                      </Col>
                      </Row>
                    : 
                      <Row>
                      <Col className={pick === event.awayTeam ? `pickedDiv picksLeftButton` : `notPickedDiv picksLeftButton`} xs={2}>
                        <Button 
                          type="submit" 
                          className={pick === event.awayTeam ? `picked pickButton` : `notPicked pickButton`}
                          onClick={() => {this.savePick(event.awayTeam, event)}}
                        >
                          {event.awayTeam}
                        </Button>
                      </Col>
                      <Col xs={2} className={pick === event.homeTeam ? `pickedDiv` : `notPickedDiv`}>
                        <Button 
                            type="submit" 
                            className={pick === event.homeTeam ? `picked pickButton` : `notPicked pickButton`}
                            onClick={() => {this.savePick(event.homeTeam, event)}}
                          >
                            {event.homeTeam}
                          </Button>
                      </Col>
                    </Row>
                    }
                <Row className='picksDate'>
                  {time}, {date}
                </Row>
              </Col>
            </Row>
            </Grid>
          </Well>
    );
  });
  }

  render() {
    return(
      <div>
        <h1>Picks</h1>
        <div>
          {this.match()}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    events: state.events,
    picks: state.picks
  };
}

export default connect(mapStateToProps, {fetchPicks, fetchSchedule, createPick})(Picks);
