import React, {Component} from "react";
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import {fetchSchedule, fetchPicks, createPick} from '../actions';
import _ from 'lodash';
// import axios from 'axios';
import moment from 'moment';
import {Well, Grid, Row, Col, Button} from "react-bootstrap";
import '../tempCSS.css';


class Picks extends Component {

  state = {
    id: localStorage.getItem("_id")
  }
 
  componentDidMount = () => {
    this.props.fetchPicks(this.state.id);
    this.props.fetchSchedule();
  }

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
    const dataToPush = {picks: picks};
    console.log(dataToPush);
    this.props.createPick(this.state.id, dataToPush, () => {
      this.props.fetchPicks(this.state.id)
    });

  }

  match = () => {
    return _.map(this.props.events, event => {
    const userPick = this.props.picks.find(pick => (pick.game === event._id));
    let pick = '';
    if(userPick) {pick = userPick.pick};
    const date = moment(event.date).format('MMMM D, YYYY');
    const time = moment(event.date).format('h:mm a');
    return(
      <Well key={event._id}>
            <Grid>
            <Row>
              <Col xs={3}>{event.league} LOGO</Col>
              <Col xs={6}>
                <Row>
                  <h2>{event.awayTeam} vs {event.homeTeam}</h2>
                </Row>
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
                  <Col xs={2}>{event.awayScore} - {event.homeScore}</Col>
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
              <Col xs={3}>Watch URL</Col>
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

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({fetchSchedule}, dispatch)
// }

export default connect(mapStateToProps, {fetchPicks, fetchSchedule, createPick})(Picks);
