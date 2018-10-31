import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchSchedule, fetchPicks, fetchPoints, createPick} from '../actions';


class Header extends Component {
  //once logging in works, header will detect if logged in.  If logged in, show name, points and logout button; else show Guest, login button
  state = {
    name: 'Visitor',
    id: localStorage.getItem("_id"),
    propsLoaded: false,
    points: {}
  }

  componentDidMount = () => {
    this.props.fetchSchedule();
    if(localStorage.getItem("name")) {
      this.props.fetchPoints(this.state.id);
      this.props.fetchPicks(this.state.id);
      const name = localStorage.getItem("name");
      this.setState({name, points: this.props.points});
    }
  }

  componentDidUpdate = () => {
    if(this.props.events.length > 0 && this.props.picks.length > 0 && !isNaN(this.props.points.lifetime) && !this.state.propsLoaded) {
      this.scoreOldEvents();
      this.setState({propsLoaded: true});
    }
  }

  //goes through the schedule to find events that are over, compares the winner to user picks, 
  //moves scored picks to archive, and updates the score.  Pushes all this to the database
  scoreOldEvents = () => {
    let addScore = 0;
    let archivePicks = this.props.events.filter(event => ((event.homeScore === Math.ceil(event.bestOf/2)) || (event.awayScore === Math.ceil(event.bestOf/2)))).map(event => {
      let winner = '';
      if (event.homeScore === Math.ceil(event.bestOf/2)) {winner = event.homeTeam}
      else if (event.awayScore === Math.ceil(event.bestOf/2)) {winner = event.awayTeam}
      let tempPicks = this.props.picks.filter(pick => {
        return(pick.game === event._id)
      });
      if (tempPicks.length === 0) {return 0}
      if (winner === tempPicks[0].pick) {
        addScore++;
        tempPicks[0].correct = 1;
      } else {
        tempPicks[0].correct = 0;
      }
      return (tempPicks[0]);
    });
    let currentPicks = this.props.picks.filter(pick => (pick.correct === -1));
    let points = this.props.points;
    points.lifetime = this.props.points.lifetime + addScore;

    const dataToPush = {
      dataToPush: {
        picks: currentPicks,
        points: points,
        archivePicks: archivePicks
    }};
    this.props.createPick(this.state.id, dataToPush, () => {
      this.props.fetchPicks(this.state.id)
    });
  }

  //logs user out
  _logout = () => {
    // event.preventDefault()
    console.log('handleClick')
    console.log('logging out')
    axios.post('/auth/logout').then(response => {
      localStorage.clear();
      if (response.status === 200) {
        this.setState({name: 'Visitor'})
      }
    })
  }

  //put update score and picks of finished games in app because these should be done right away regardless of what page a visitor initially goes to


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
      const dataToPush = {picks: picks};
      this.props.createPick(this.state.id, dataToPush, () => {
        this.props.fetchPicks(this.state.id)
      });
    }

  render() {
    return(
      <header>
        {this.state.name ==="Visitor" ? 
          <ul className="headerUL">
            <li className="headerLI"><Link to="/login"><Button>Login</Button></Link></li>
            <li className="headerLI"><Link to='/createaccount'><Button>New User</Button></Link></li>
            <li className="headerUserName headerLI">{this.state.name}</li>   
          </ul> :
          <ul className="headerUL">
            <li className="headerLI"><Button onClick={this._logout}>Logout</Button></li>
            <li className="headerLI">Current points: <br></br>
              <div className="headerPoints">{this.props.points.lifetime - this.props.points.spent}</div></li>
            <li className="headerLI">Total points: <br></br>
              <div className="headerPoints">{this.props.points.lifetime}</div></li>
            <li className="headerUserName headerLI">{this.state.name}</li>   

          </ul>
        }
      </header>
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

export default connect(mapStateToProps, {fetchPicks, fetchPoints, fetchSchedule, createPick})(Header);