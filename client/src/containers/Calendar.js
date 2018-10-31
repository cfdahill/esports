import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchSchedule} from '../actions';
import FullCalendar from 'fullcalendar-reactwrapper';
import moment from 'moment-timezone';
import {ToggleButtonGroup, ToggleButton, Button, Modal} from "react-bootstrap";
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import '../css/calendar.css';

//calendar is pretty much done, will need to come back to update info being passed to modal

class Calendar extends Component {
    state={
        events: [],
        hideEvents: [],
        value: [
          { number: 0, game: "hs", name: "HearthStone", checked: true },
          { number: 1, game: "hots", name: "Heroes of the Storm", checked: true },
          { number: 2, game: "ow", name: "OverWatch", checked: true },
          { number: 3, game: "sc", name: "StarCraft II", checked: true },
          { number: 4, game: "wow", name: "World of WarCraft", checked: true}
        ],
        show: false,
        modalEvent: {}
    }

    componentDidMount = () => {
        this.props.fetchSchedule()
          .then(result => {
            this.events();
          });
    }

    //Create array of events for calendar based on the data from the reducers
    events = () => {
        let events = this.props.events.map( event => ({
            title: `${event.league.toUpperCase()}: ${event.awayTeam} vs. ${event.homeTeam}`,
            start: moment.tz(event.date, 'America/Phoenix'),
            league: event.league,
            watch: event.watch[0],
            className: `cal${event.league}`
            }));
        this.setState({events});
    }

    //Create buttons to toggle the visibility of events on/off
    renderButton = (game) => {
      console.log(game.game);
      const i = game.number;
      let events = this.state.events;
      let hideEvents = this.state.hideEvents;
      return(
        <ToggleButton className={`calButton cal${game.game}`} value={game.game} key={game.game} onChange={ () => {
          //For whatever reason, if this is in a different method it creates an infinate loop.
          if(game.checked){
            game.checked = false;
            hideEvents = hideEvents.concat(events.filter(event => (event.game === game.game)));
            events = events.filter(event => (event.game !== game.game));
          }else{
            game.checked = true;
            events = events.concat(hideEvents.filter(event => (event.game === game.game)));
            hideEvents = hideEvents.filter(event => (event.game !== game.game));
          }
          let value = this.state.value;
          value[i].checked = game.checked;
          this.setState({value, events, hideEvents});
    }}>{game.name}</ToggleButton>
  )}

  //hide Modal
  handleClose = () => {
    this.setState({ show: false });
  }

  //show Modal
  handleShow = (e) => {
    const date = moment.tz(e.start, 'America/Phoenix');
    const guessTZ = moment.tz.guess();
    let modalEvent = {
      title: e.title,
      date: moment(date._i).tz(guessTZ).format('MMMM D, YYYY'),
      time: moment(date._i).tz(guessTZ).format('h:mm a z'),
      game: e.game,
      watch: e.watch,
      league: e.league
    }
    this.setState({ modalEvent, show: true });
  }

    render() {
        return(
          <div>
            <div className="calCheckbox">
              <ToggleButtonGroup type="checkbox">
                {this.state.value.map(game => (this.renderButton(game)))}
              </ToggleButtonGroup>
            </div>
            <div 
                id="calContainer"
                /*Style of height and width are needed here but don't need to be numbers shown, might be able to move to css file*/
            >
                <FullCalendar
                    id="calendarID"
                    header = {{
                        left: 'prev, next, today',
                        center: 'title',
                        right: 'month,basicWeek,basicDay,list'
                    }}
                    events = {this.state.events}
                    eventClick = {e => this.handleShow(e)}
                    list = {this.state.events}
                />
            </div> 
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton className={`cal${this.state.modalEvent.league}`}>
                <Modal.Title>{this.state.modalEvent.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body className={`cal${this.state.modalEvent.league}`}>
                Date: {this.state.modalEvent.date} 
                <br></br>
                Time: {this.state.modalEvent.time}
                <br></br>
                Watch: <a className='cala' href={this.state.modalEvent.watch} target="blank">Twitch</a>
              </Modal.Body>
              <Modal.Footer className={`cal${this.state.modalEvent.league}`}>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);