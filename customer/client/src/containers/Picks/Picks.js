import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchSchedule} from '../../actions';
import moment from 'moment';
import {Well, Grid, Row, Col, Button} from "react-bootstrap";


class Picks extends Component {
  state = {
    events: [
      {
        id: "1234123",
        homeTeam: "team1",
        homeScore: 0,
        awayTeam: "team2",
        awayScore: 0,
        game: "hots",
        league: "hct",
        date: "2018-08-09T12:00:00",
      },
      {
        id: "1233",
        homeTeam: "team1",
        homeScore: 0,
        awayTeam: "team2",
        awayScore: 0,
        game: "hots",
        league: "hct",
        date: "2018-08-10T12:00:00",
      },
      {
        id: "12343",
        homeTeam: "player1",
        homeScore: 0,
        awayTeam: "player2",
        awayScore: 0,
        game: "hs",
        league: "hsl",
        date: "2018-08-19T12:00:00",
    },
    {
      id: "1233333",
        homeTeam: "player1",
        homeScore: 0,
        awayTeam: "player2",
        awayScore: 0,
        game: "hs",
        league: "hsl",
        date: "2018-08-20T12:00:00",
    },
    {
      id: "199983",
      homeTeam: "team1",
      homeScore: 0,
      awayTeam: "team2",
      awayScore: 0,
      game: "ow",
      league: "owl",
      date: "2018-08-13T12:00:00",
    },
    {
      id: "12340123",
      homeTeam: "team1",
      homeScore: 0,
      awayTeam: "team2",
      awayScore: 0,
      game: "ow",
      league: "owl",
      date: "2018-08-14T12:00:00",
    }
  ]
  }

  savePick = (team) => {
    console.log(`You picked ${team}`);
    //will need to implement this feature once the userDB is up and running
  }

  match = event => {
    const date = moment(event.date).format('MMMM D, YYYY');
    const time = moment(event.date).format('h:mm a');
    return(
      <Well key={event.id}>
            <Grid>
            <Row>
              <Col xs={3}>{event.league} LOGO</Col>
              <Col xs={6}>
                <Row>
                  <h2>{event.awayTeam} vs {event.homeTeam}</h2>
                </Row>
                <Row>
                  <Col xs={2}>
                    <Button onClick={this.savePick(event.awayTeam)}>awayLogo</Button>
                  </Col>
                  <Col xs={2}>{event.awayScore} - {event.homeScore}</Col>
                  <Col xs={2}>
                    <Button onClick={this.savePick(event.homeTeam)}>homeLogo</Button>
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
    )
  }

  render() {
    return(
      <div>
        <h1>Picks</h1>
          <div>
            {this.state.events.map(event => (this.match(event)))}
          </div>
      </div>
    )
  }

}


function mapStateToProps(events) {
  return {events};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchSchedule}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Picks);