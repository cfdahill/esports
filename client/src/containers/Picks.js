import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchSchedule, fetchPicks, createPick} from '../actions';
import _ from 'lodash';
import moment from 'moment-timezone';
import {Well, Grid, Row, Col, Button} from "react-bootstrap";
import '../tempCSS.css';


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
        <Well key={event._id}>
            <h1>{event.title}</h1>
            <Grid>
            <Row>
              <Col xs={3}>{event.league} LOGO</Col>
              <Col xs={6}>
                <Row>
                  <h2>{event.awayTeam} vs {event.homeTeam}</h2>
                </Row>
                {/* Uncomment out this part once you are ready to remove buttons of previous events
                and you actually need to change it to being past current start time otherwise people can pick while the game is ongoing */}
                    {/* {((event.homeScore === 3) || (event.awayScore ===3 )) ?
                      <Row>
                      <Col xs={2}>
                        <div className={pick === event.awayTeam ? `picked` : `notPicked`}>
                          awayLogo
                        </div>
                      </Col>
                      <Col xs={2}>
                        {event.awayScore} - {event.homeScore}
                      </Col>
                      <Col xs={2}>
                        <div className={pick === event.homeTeam ? `picked` : `notPicked`}>
                          homeLogo
                        </div>
                      </Col>
                      </Row>
                    : */}
                      <Row>
                      <Col xs={2}>
                        <Button 
                          type="submit" 
                          className={pick === event.awayTeam ? `picked` : `notPicked`}
                          onClick={() => {this.savePick(event.awayTeam, event)}}
                        >
                          awayLogo
                        </Button>
                      </Col>
                      <Col xs={2}>
                        {event.awayScore} - {event.homeScore}
                      </Col>
                      <Col xs={2}>
                        <Button 
                            type="submit" 
                            className={pick === event.homeTeam ? `picked` : `notPicked`}
                            onClick={() => {this.savePick(event.homeTeam, event)}}
                          >
                            homeLogo
                          </Button>
                      </Col>
                    </Row>
                <Row>
                  {time}, {date}
                </Row>
              </Col>
              <Col xs={3}> Watch: <a href={event.watch[0]} target="blank">Twitch</a></Col>
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
