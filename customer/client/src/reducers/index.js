import {combineReducers} from 'redux';
// import EventsReducer from './reducer_events';
import EventsReducer from './reducer_schedule';

const rootReducer = combineReducers({
    events: EventsReducer
});

export default rootReducer;