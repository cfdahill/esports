import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {schedules} from '../../actions/index';
import FullCalendar from 'fullcalendar-reactwrapper';
import {ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'

class Calendar extends Component {
    state={
        events: [],
        hideSchedule: [],
        value: [
          { number: 0, game: "HS", name: "HearthStone", checked: true },
          {number: 1, game: "HotS", name: "Heroes of the Storm", checked: true },
          {number: 2, game: "OW", name: "OverWatch", checked: true },
          {number: 3, game: "SC", name: "StarCraft II", checked: true },
          {number: 4, game: "WoW", name: "World of WarCraft", checked: true}
        ]
    }

    componentDidMount = () => {
        this.events();
    }

    events = () => {
        let events = this.props.events.map( event => ({
            title: `${event.league}: ${event.awayTeam} vs. ${event.homeTeam}`,
            start: event.date
            }));
        this.setState({events});
    }

    toggleEvents = (e) => {
      let value = this.state.value;
      if(value[e]){
        value[e] = false;
      // }else{
      //   value[e] = true;
      }
      console.log(value);
      this.setState({value});
      // let events = this.state.events;
      // let hideSchedule = this.state.hideSchedule;
      console.log(e);
    }

    renderButton = (game) => {
      console.log(game);
      const i = game.number;
      return(
        <ToggleButton value={game.game} key={game.game} onChange={ () => {
          if(game.checked){
            game.checked = false;
          }else{
            game.checked = true;
          }
          let value = this.state.value;
          value[i].checked = game.checked
          console.log(value, value[i]);
          this.setState({value});
          console.log("clicked");
    }}>{game.name}</ToggleButton>
  )}

    render() {
        return(
          <div>
            <div id="checkboxes">
              <ToggleButtonGroup type="checkbox">
              {this.state.value.map(game => (this.renderButton(game)))}
                {/* <ToggleButton value={"HS"} onChange={this.test}>HearthStone</ToggleButton> */}
                {/* <ToggleButton value={"HotS"} onChange={this.toggleEvents("HotS")}>Heroes of the Storm</ToggleButton>
                <ToggleButton value={"OW"} onClick={this.toggleEvents("OW")}>OverWatch</ToggleButton>
                <ToggleButton value={"SC"} onChange={this.toggleEvents("SC")}>StarCraft II</ToggleButton>
                <ToggleButton value={"WoW"} onClick={this.toggleEvents("WoW")}>World of Warcraft</ToggleButton> */}
              </ToggleButtonGroup>
            </div>
            <div 
                id="calContainer"
                style={{height: 600, width: 800}}    
            >
                <FullCalendar
                    id="calendarID"
                    header = {{
                        left: 'prev, next, today',
                        center: 'title',
                        right: 'month,basicWeek,basicDay,list'
                    }}
                    events = {this.state.events}
                />
            </div> 
          </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        events: state.events
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({schedules: schedules}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);