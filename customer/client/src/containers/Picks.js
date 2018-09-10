import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchSchedule} from '../actions';
import _ from 'lodash';
import moment from 'moment';
import {Well, Grid, Row, Col, Button} from "react-bootstrap";


class Picks extends Component {
 
  componentDidMount = () => {
    this.props.fetchSchedule()
  }

  savePick = (team) => {
    console.log(`You picked ${team}`);
    //will need to implement this feature once the userDB is up and running
  }

  match = () => {
    return _.map(this.props.events, event => {
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
                    <Button type="submit" onClick={() => {this.savePick(event.awayTeam)}}>awayLogo</Button>
                  </Col>
                  <Col xs={2}>{event.awayScore} - {event.homeScore}</Col>
                  <Col xs={2}>
                    <Button type="submit" onClick={() => {this.savePick(event.awayTeam)}}>homeLogo</Button>
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
  return {events: state.events};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchSchedule}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Picks);