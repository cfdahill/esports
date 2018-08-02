import React, {Component} from "react";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'

export default class Calendar extends Component {
    state={
        events: [{
                    id: 999,
                    title: 'Sample Event',
                    start: '2018-08-09T16:00:00'
        }]
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