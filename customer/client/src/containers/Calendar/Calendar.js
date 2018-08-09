import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {schedules} from '../../actions/index';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'

class Calendar extends Component {
    state={
        events: []
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

    render() {
        return(
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